import { bridges, lendBorrowEarn } from "./contracts";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CalendarHeatmap, {
  ReactCalendarHeatmapValue,
} from "react-calendar-heatmap";
import { Address } from "viem";
import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import AccordionWrapper from "@/components/manage/AccordionWrapper";
import { LinkIcon } from "@/components/logos";
import axios from "axios";
import ModalWrapper from "@/components/ui/ModalWrapper";
import { useAtomValue } from "jotai";
import { Styles } from "@/types";
import { onchainScoreTypeAtom } from "@/core/atoms";
import ReactSpeedometer, { Transition } from "react-d3-speedometer";

// Routers
const UNISWAP_ROUTER = "0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad"; // Uniswap router - base
const AERODROME_ROUTER = "0x6cb442acf35158d5eda88fe602221b67b400be3e"; // Aerodrome router - base
const ONEINCH_ROUTER = "0x1111111254eeb25477b68fb85ed929f73a960582"; // 1inch router - base

// ENS Registrar Controllers
const ETH_REGISTRAR_CONTROLLER_1 = "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5"; // ETHRegistrarController
const ETH_REGISTRAR_CONTROLLER_2 = "0x253553366da8546fc250f225fe3d25d0c782303b"; // ETHRegistrarController
const BASENAMES_REGISTRAR_CONTROLLER =
  "0x4ccb0bb02fcaba27e82a56646e81d8c5bc4119a5"; // Basenames RegistrarController
const BASENAMES_EA_REGISTRAR_CONTROLLER =
  "0xd3e6775ed9b7dc12b205c8e608dc3767b9e5efda"; // Basenames EARegistrarController

// Lending and Borrowing
const MOONWELL_WETH_UNWRAPPER = "0x1382cff3cee10d283dcca55a30496187759e4caf"; // Base Moonwell WETH Unwrapper

// Swap Function Names
const SWAP_FUNCTION_NAMES = ["swap", "fillOtcOrderWithEth", "proxiedSwap"];

type HeatmapValue = {
  date: string;
  count: number;
};

type Transaction = {
  timeStamp: string;
  from: string;
  to: string;
  functionName?: string;
  input: string;
  hash: string;
};

interface Props {
  profileAddress: `0x${string}`;
  styles?: Styles;
}

export default function ProfileOnChainScore({ profileAddress, styles }: Props) {
  const type = styles?.type ?? useAtomValue(onchainScoreTypeAtom);

  // The ref/effect here are a kinda jank approach to reaching into the heatmap library's rendered dom and modifying individual rect attributes.
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const pollForRects = () => {
      const containerElement = containerRef.current;
      if (!containerElement) return;
      const rects = containerElement.querySelectorAll("rect");
      if (rects.length > 0) {
        rects.forEach((rect) => {
          rect.setAttribute("rx", "2");
          rect.setAttribute("ry", "2");
        });
        clearInterval(timerId);

        // this line ensures that if the element is scrollable it will be all the way right (showing newest cal data)
        containerElement.scrollLeft = containerElement.scrollWidth;
      }
    };
    const timerId = setInterval(pollForRects, 100);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [totalTx, setTotalTx] = useState<number>(0);
  const [tokenSwapCount, setTokenSwapCount] = useState<number>(0);
  const [ensCount, setEnsCount] = useState<number>(0);
  const [bridgeCount, setBridgeCount] = useState<number>(0);
  const [lendCount, setLendCount] = useState<number>(0);
  const [buildCount, setBuildCount] = useState<number>(0);
  const [heatmapData, setHeatmapData] = useState<HeatmapValue[]>([]);
  const [uniqueActiveDays, setUniqueActiveDays] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [activityPeriod, setActivityPeriod] = useState<number>(0);
  const [ethereumDeployments, setEthereumDeployments] = useState<string[]>([]);
  const [baseDeployments, setBaseDeployments] = useState<string[]>([]);
  const [totalTransactionsList, setTotalTransactionsList] = useState<
    Transaction[]
  >([]);

  const generateHeatmapData = (transactions: Transaction[]): HeatmapValue[] => {
    const dateMap: Record<string, HeatmapValue> = {};
    transactions.forEach((tx) => {
      const txDate = new Date(
        parseInt(tx.timeStamp) * 1000
      ).toLocaleDateString();
      dateMap[txDate] = dateMap[txDate]
        ? { date: txDate, count: dateMap[txDate].count + 1 }
        : { date: txDate, count: 1 };
    });
    return Object.values(dateMap);
  };

  const calculateStreaksAndMetrics = (
    transactions: Transaction[],
    addrs: Address
  ) => {
    const filteredTransactions = transactions.filter(
      (tx) => tx.from.toLowerCase() === addrs.toLowerCase()
    );
    if (filteredTransactions.length === 0)
      return {
        uniqueActiveDays: 0,
        longestStreakDays: 0,
        currentStreakDays: 0,
        activityPeriod: 0,
      };

    const timestamps = filteredTransactions.map((tx) =>
      parseInt(tx.timeStamp, 10)
    );
    const firstTransactionDate = new Date(Math.min(...timestamps) * 1000);
    const lastTransactionDate = new Date(Math.max(...timestamps) * 1000);

    const uniqueActiveDaysSet = new Set(
      filteredTransactions.map((tx) =>
        new Date(parseInt(tx.timeStamp, 10) * 1000).toDateString()
      )
    );

    const sortedDates = Array.from(uniqueActiveDaysSet)
      .map((dateStr) => new Date(dateStr))
      .sort((a, b) => a.getTime() - b.getTime());

    let longestStreakDays = 0;
    let streak = 0;
    for (let i = 0; i < sortedDates.length; i++) {
      if (
        i === 0 ||
        (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) /
          (1000 * 60 * 60 * 24) ===
          1
      ) {
        streak++;
      } else {
        longestStreakDays = Math.max(longestStreakDays, streak);
        streak = 1;
      }
    }
    longestStreakDays = Math.max(longestStreakDays, streak);

    return {
      uniqueActiveDays: uniqueActiveDaysSet.size,
      longestStreakDays,
      currentStreakDays:
        sortedDates[sortedDates.length - 1].toDateString() ===
        new Date().toDateString()
          ? streak
          : 0,
      activityPeriod: Math.max(
        Math.ceil(
          (lastTransactionDate.getTime() - firstTransactionDate.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
        1
      ),
    };
  };

  const fetchTransactions = useCallback(
    async (apiUrl: string, retryCount = 3): Promise<Transaction[]> => {
      try {
        const response = await fetch(apiUrl);
        const json = (await response.json()) as {
          result: Transaction[];
          status: "1" | "0";
          message: string;
        };

        if (json.status === "1" && Array.isArray(json.result)) {
          return json.result;
        } else if (
          json.status === "0" &&
          json.message === "No transactions found"
        ) {
          return []; // Return an empty array for no transactions
        } else if (json.status === "0" && json.message === "Exception") {
          if (retryCount > 0) {
            console.log(
              `API returned an exception. Retrying... (${retryCount} attempts left)`
            );
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return await fetchTransactions(apiUrl, retryCount - 1);
          } else {
            throw new Error(`API Error: ${json.message}`);
          }
        } else {
          console.error("Unexpected API response structure:", json);
          return [];
        }
      } catch (e) {
        console.error("Error fetching transactions:", e);
        throw e;
      }
    },
    []
  );

  const filterTransactions = (
    transactions: Transaction[],
    addrs: string[]
  ): Transaction[] => {
    return transactions.filter((tx) =>
      addrs.some((addr) => tx.from.toLowerCase() === addr.toLowerCase())
    );
  };

  const calculateScore = useCallback(
    (completedTasks: number, transactions: Transaction[]): number => {
      const taskScore = (Math.min(completedTasks, 6) / 6) * 35;
      const txScore = (Math.min(totalTx, 100) / 100) * 20;
      const daysScore = (Math.min(uniqueActiveDays, 100) / 100) * 15;
      const longestStreakScore = (Math.min(longestStreak, 30) / 30) * 5;
      const currentStreakScore = (Math.min(currentStreak, 5) / 5) * 5;
      const activityPeriodScore = (Math.min(activityPeriod, 365) / 365) * 5;

      const recencyScore = calculateRecencyScore(transactions);
      const total = Math.round(
        taskScore +
          txScore +
          daysScore +
          longestStreakScore +
          currentStreakScore +
          activityPeriodScore +
          recencyScore
      );

      return total;
    },
    [activityPeriod, currentStreak, longestStreak, totalTx, uniqueActiveDays]
  );

  const calculateRecencyScore = (transactions: Transaction[]): number => {
    const now = Date.now();
    const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;

    const recentTransactions = transactions.filter(
      (tx) => parseInt(tx.timeStamp) * 1000 > ninetyDaysAgo
    );
    const recentTxCount = recentTransactions.length;

    // Base score for up to 60 transactions (10 points)
    const baseScore = (Math.min(recentTxCount, 60) / 60) * 10;

    // Additional score for transactions beyond 60, up to 180 (5 points)
    const additionalScore =
      recentTxCount > 60 ? (Math.min(recentTxCount - 60, 120) / 120) * 5 : 0;

    // Total recency score (max 15 points)
    return baseScore + additionalScore;
  };

  const fetchData = useCallback(
    async (addrs: Address) => {
      setIsLoading(true);

      try {
        const allTransactions: Transaction[] = [];
        let allEthereumDeployments: string[] = [];
        let allBaseDeployments: string[] = [];
        let allSepoliaDeployments: string[] = [];

        const [
          ethereumTransactions,
          baseTransactions,
          baseInternalTransactions,
          sepoliaTransactions,
        ] = await Promise.all([
          fetchTransactions(
            `https://api.etherscan.io/api?address=${addrs}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}&module=account&action=txlist`
          ).catch(() => []),
          fetchTransactions(
            `https://api.basescan.org/api?address=${addrs}&apikey=${process.env.NEXT_PUBLIC_BASESCAN_API_KEY}&module=account&action=txlist`
          ).catch(() => []),
          fetchTransactions(
            `https://api.basescan.org/api?address=${addrs}&apikey=${process.env.NEXT_PUBLIC_BASESCAN_API_KEY}&module=account&action=txlistinternal`
          ).catch(() => []),
          fetchTransactions(
            `https://api-sepolia.basescan.org/api?address=${addrs}&apikey=${process.env.NEXT_PUBLIC_BASESCAN_API_KEY}&module=account&action=txlistinternal`
          ).catch(() => []),
        ]);

        const filteredEthereumTransactions = filterTransactions(
          ethereumTransactions,
          [addrs]
        );
        const filteredBaseTransactions = filterTransactions(baseTransactions, [
          addrs,
        ]);
        const filteredSepoliaTransactions = filterTransactions(
          sepoliaTransactions,
          [addrs]
        );

        // Filter and deduplicate internal Base transactions
        const filteredBaseInternalTransactions = baseInternalTransactions
          .filter((tx) => tx.from.toLowerCase() === addrs.toLowerCase())
          .filter(
            (tx) => !baseTransactions.some((baseTx) => baseTx.hash === tx.hash)
          );

        allTransactions.push(
          ...filteredEthereumTransactions,
          ...filteredBaseTransactions,
          ...filteredBaseInternalTransactions
        );

        allEthereumDeployments = [
          ...allEthereumDeployments,
          ...filteredEthereumTransactions
            .filter((tx) => tx.input?.startsWith("0x60806040"))
            .map((tx) => tx.hash),
        ];
        allBaseDeployments = [
          ...allBaseDeployments,
          ...filteredBaseTransactions
            .filter((tx) => tx.input.includes("60806040"))
            .map((tx) => tx.hash),
        ];
        allSepoliaDeployments = [
          ...allSepoliaDeployments,
          ...filteredSepoliaTransactions
            .filter((tx) => tx.input.includes("60806040"))
            .map((tx) => tx.hash),
        ];

        if (allTransactions.length === 0) {
          return;
        }

        setTotalTransactionsList(allTransactions);
        setTotalTx(allTransactions.length);
        setHeatmapData(generateHeatmapData(allTransactions));

        const {
          uniqueActiveDays: activeDays,
          longestStreakDays,
          currentStreakDays,
          activityPeriod: activity,
        } = calculateStreaksAndMetrics(allTransactions, addrs);
        setUniqueActiveDays(activeDays);
        setLongestStreak(longestStreakDays);
        setCurrentStreak(currentStreakDays);
        setActivityPeriod(activity);

        setTokenSwapCount(
          allTransactions.filter(
            (tx) =>
              ((tx.functionName &&
                SWAP_FUNCTION_NAMES.some((fn) =>
                  tx.functionName?.includes(fn)
                )) ??
                tx.to === UNISWAP_ROUTER) ||
              tx.to === AERODROME_ROUTER ||
              tx.to === ONEINCH_ROUTER
          ).length
        );

        // ENS count calculation
        setEnsCount(
          allTransactions.filter((tx) =>
            [
              ETH_REGISTRAR_CONTROLLER_1,
              ETH_REGISTRAR_CONTROLLER_2,
              BASENAMES_REGISTRAR_CONTROLLER,
              BASENAMES_EA_REGISTRAR_CONTROLLER,
            ].includes(tx.to)
          ).length
        );

        setBridgeCount(
          allTransactions.filter((tx) => bridges.has(tx.to)).length
        );

        setLendCount(
          allTransactions.filter(
            (tx) =>
              lendBorrowEarn.has(tx.to) || tx.from === MOONWELL_WETH_UNWRAPPER
          ).length
        );

        setBuildCount(
          allEthereumDeployments.length +
            allBaseDeployments.length +
            allSepoliaDeployments.length
        );
        setEthereumDeployments(allEthereumDeployments);
        setBaseDeployments(allBaseDeployments);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setIsLoading(false);
        setIsDataFetched(true);
      }
    },
    [fetchTransactions]
  );

  useEffect(() => {
    if (!profileAddress) return;
    if (!isDataFetched) {
      void fetchData(profileAddress);
    }
  }, [fetchData, isDataFetched, profileAddress]);

  const contractsDeployed = useMemo(() => {
    return ethereumDeployments.length + baseDeployments.length;
  }, [baseDeployments.length, ethereumDeployments.length]);

  const tasksCompleted = useMemo(
    () =>
      [
        totalTransactionsList.length > 0,
        tokenSwapCount > 0,
        bridgeCount > 0,
        lendCount > 0,
        ensCount > 0,
        buildCount > 0,
      ].filter(Boolean).length,
    [
      bridgeCount,
      buildCount,
      ensCount,
      lendCount,
      tokenSwapCount,
      totalTransactionsList.length,
    ]
  );
  const finalScore = useMemo(
    () => calculateScore(tasksCompleted, totalTransactionsList),
    [calculateScore, tasksCompleted, totalTransactionsList]
  );  

  return (
    <Box
      as={type === "modal" ? ModalWrapper : AccordionWrapper}
      title={isLoading ? `OnChain Score` : `OnChain Score - ${finalScore}/100`}
      icon={`${isLoading ? 'x' : finalScore}%`}
      styles={{ size: "lg" }}
      isProfile
    >
      {isLoading || !isDataFetched ? <Center minH={100}><Spinner size={'lg'}/> </Center> : 
      <Stack align={"center"} justify={"center"} w={"100%"}>
        {/* <Box
          width={[360, 440, 460, 500, 520]}
          height={[290, 320, 320, 340, 360]}
          placeContent={'center'}
          placeItems={'center'}
          //bgColor={'blackAlpha.200'}
          rounded='2xl'
        > */}
        <Box
          width={[320, 400, 420, 440, 480]}
          height={[220, 250, 260, 270, 280]}
        >
          <ReactSpeedometer
            needleColor="#ffffff"
            fluidWidth
            key={'onchainscore-box-'+finalScore}
            paddingVertical={8}
            value={finalScore}
            maxValue={100}
            forceRender={isDataFetched}
            needleTransitionDuration={2000}
            startColor="#98caff"
            endColor="#00458f"
            //segmentColors={["#98caff", "#5cabff", "#007bff", "#00458f"]}
            segments={5}
            textColor="#ffffff"
            currentValueText={``}
          />
        </Box>
        <SimpleGrid columns={[1, 1, 1, 1, 2]} spacingX={10} gap={4} w={'100%'} p={4} textAlign={'left'}>
          <Flex gap={4} align={"center"} justify={'space-between'}>
            <Text>Txs on Ethereum & Base</Text>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
              {totalTx}
            </Text>
          </Flex>

          <Flex gap={4} align={"center"} justify={'space-between'}>
            <Text>Unique days active</Text>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
              {uniqueActiveDays}
            </Text>
          </Flex>

          <Flex gap={4} align={"center"} justify={'space-between'}>
            <Text>Day longest streak</Text>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
              {longestStreak}
            </Text>
          </Flex>

          <Flex gap={4} align={"center"} justify={'space-between'}>
            <Text>Day current streak</Text>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
              {currentStreak}
            </Text>
          </Flex>

          <Flex gap={4} align={"center"} justify={'space-between'}>
            <Text>Day activity period</Text>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
              {activityPeriod}
            </Text>
          </Flex>

          <Flex gap={4} align={"center"} justify={'space-between'}>
            <Text>Token swaps performed</Text>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
              {tokenSwapCount}
            </Text>
          </Flex>

          <Flex gap={4} align={"center"} justify={'space-between'}>
            <Text>Bridge transactions</Text>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
              {bridgeCount}
            </Text>
          </Flex>

          <Flex gap={4} align={"center"} justify={'space-between'}>
            <Text>Lend/borrow/stake Txs</Text>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
              {lendCount}
            </Text>
          </Flex>

          <Flex gap={4} align={"center"} justify={'space-between'}>
            <Text>ENS contract interactions</Text>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
              {ensCount}
            </Text>
          </Flex>

          <Flex gap={4} align={"center"} justify={'space-between'}>
            <Text>Smart contracts deployed</Text>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
              {contractsDeployed}
            </Text>
          </Flex>
        </SimpleGrid>
      </Stack>}
    </Box>
  );
}
