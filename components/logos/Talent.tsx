import { useColorMode, Box } from "@chakra-ui/react";
interface Props {
  color?: string;
  size?: string | number;
}
function Talent({ color, size }: Props) {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 260 260"
        width={size ?? 26}
        height={size ?? 26}
      >
        <path
          d="M87.2517 112.863C91.5797 117.178 97.3505 119.336 104.564 119.336H178.34L170.031 95.6013H111.297C106.808 95.6013 104.564 93.2038 104.564 88.409V30.0178L81 22V95.6013C81 102.794 83.0839 108.547 87.2517 112.863Z"
          fill={color ? color : colorMode === 'dark' ? "white" : "black"}
        />
        <path
          d="M87.2517 231.527C91.5797 235.842 97.3505 238 104.564 238H178.34L170.031 214.265H111.297C106.808 214.265 104.564 211.868 104.564 207.073V148.682L81 140.664V214.265C81 221.458 83.0839 227.212 87.2517 231.527Z"
          fill={color ? color : colorMode === 'dark' ? "white" : "black"}
        />
      </svg>
    </Box>
  );
}

export default Talent;
