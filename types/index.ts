import React, { ReactNode } from 'react';

export interface State<T> {
  loading: boolean;
  data?: T;
  error?: string;
}

export interface PrimaryName {
  nftAddress?: string;
  name?: string | undefined;
}

export interface ObjectItem {
  key: string;
  value?: string;
}

export interface SelectOptionType {
  label?: string;
  value: string;
}

export interface Message {
  type: any;
  title: string;
  msg: string;
  link?: string;
}

export interface Styles {
  height?: string;
  shadow?: string;
  popup?: boolean;
  radius?: string;
  size?: 'sm' | 'md' | 'lg';
  nolink?: boolean;
  scanLink?: boolean;
  icon?: string;
  color?: string;
  bg?: string;
  vertical?: boolean;
  nav?: boolean;
  navColor?: string;
  network?: string;
  order?: number;
  type?: string;
  mode?: string;
  note?: string;
  variant?: string;
  round?: string;
  eth?: string;
  btc?: string;
  pol?: string;
  arb?: string;
  op?: string;
  slides?: number;
  gap?: number;
  centered?: boolean;
  auto?: boolean;
  effect?: string;
  position?: string;
  font?: string;
  
}

export interface CustomLink {
  type: string;
  title: string;
  url: string;
  image: string;
  content: string;
  styles?: Styles;
}

export interface LinkType {
  type: string;
  av: boolean;
  reg: string | RegExp;
}

export interface BgColorItem {
  color: string;
  lightMode: boolean;
}

export interface BgImageItem {
  bg: string;
  lightMode: boolean;
}

export interface SortableConProps {
  children: ReactNode;
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: any; newIndex: any }) => void;
  useDragHandle: true;
}

export interface SortableItemProps {
  children: ReactNode;
  index: number;
}

export type Trophies = {
  total: number;
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
};

export type Stats = {
  gamesPlayed: number;
  completedGames: number;
  completionRate: string;
  unearnedTrophies: number;
  trophiesPerDay: string;
  views: number;
  worldRank: string;
  countryRank: string;
};

export type Trophy = {
  name: string;
  description: string;
  game: string;
  rarity: string;
  type: string;
  imageUrl: string;
};

export type Game = {
  name: string;
  platform: string;
  trophies: {
    total: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  completion: string;
  rank: string;
  imageUrl: string;
};

export type RarestTrophy = {
  name: string;
  game: string;
  rarity: string;
  type: string;
  imageUrl: string;
};

export type TrophyMilestone = {
  name: string;
  game: string;
  milestone: string;
  timeAgo: string;
  imageUrl: string;
};

export type PSNProfileData = {
  username: string;
  avatar: string;
  level: number;
  levelProgress: string;
  comment: string;
  trophies: Trophies;
  stats: Stats;
  recentTrophies: Trophy[];
  games: Game[];
  rarestTrophies: RarestTrophy[];
  trophyMilestones: TrophyMilestone[];
};

export type LinktreeData = {
  title: string;
  bio: string;
  avatar: string; // Add avatar URL
  links: CustomLink[];
  socials: ObjectItem[]; // Add socials array
};

export interface PassportProfile {
  bio: string;
  data_sources: {
    bio: string;
    tags: string;
    location: string;
    image_url: string;
    profile_bio: string;
    display_name: string;
    profile_name: string;
    profile_image_url: string;
    profile_display_name: string;
  };
  display_name: string;
  image_url: string;
  location: string;
  name: string;
  tags: string[];
}

export interface PassportSocial {
  disconnected: boolean;
  follower_count: number | null;
  following_count: number | null;
  location: string | null;
  profile_bio: string;
  profile_display_name: string;
  profile_image_url: string | null;
  profile_name: string;
  profile_url: string;
  source: string;
}

export interface User {
  admin: boolean;
  email: string | null;
  id: string;
  name: string | null;
  profile_picture_url: string;
}

export interface TalentPassport {
  activity_score: number;
  calculating_score: boolean;
  created_at: string;
  human_checkmark: boolean;
  identity_score: number;
  last_calculated_at: string;
  main_wallet: string;
  main_wallet_changed_at: string;
  merged: boolean;
  nominations_received_count: number;
  passport_id: number;
  passport_profile: PassportProfile;
  passport_socials: PassportSocial[];
  pending_kyc: boolean;
  score: number;
  skills_score: number;
  socials_calculated_at: string;
  user: User;
  verified: boolean;
  verified_wallets: string[];
}