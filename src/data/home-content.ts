export interface Game {
  slug: string;
  name: string;
  rating: number;
  likesCount: number;
  price: string;
  image: string;
}

export interface LeaderboardRow {
  rank: number;
  playerName: string;
  gamesPlayed: number;
  totalScore: number;
  streakDays: number;
  favoriteGameName: string;
}

import vacationCafe from '../assets/images/games/vacation-cafe-simulator-card.jpg';
import winterBurrow from '../assets/images/games/winter-burrow-card.jpg';
import shelvePotions from '../assets/images/games/shelve-the-potions-card.jpg';
import heartopia from '../assets/images/games/heartopia-card.jpg';
import palia from '../assets/images/games/palia-card.jpg';
import catMail from '../assets/images/games/cat-mail-co-card.jpg';

export const newGames: Game[] = [
  {
    slug: 'vacation-cafe-simulator',
    name: 'Vacation Cafe Simulator',
    rating: 4.8,
    likesCount: 28_750,
    price: 'Free',
    image: vacationCafe,
  },
  {
    slug: 'winter-burrow',
    name: 'Winter Burrow',
    rating: 4.9,
    likesCount: 32_400,
    price: 'Free',
    image: winterBurrow,
  },
  {
    slug: 'shelve-the-potions',
    name: 'Shelve the Potions!',
    rating: 4.7,
    likesCount: 21_300,
    price: 'Free',
    image: shelvePotions,
  },
  {
    slug: 'heartopia',
    name: 'Heartopia',
    rating: 4.6,
    likesCount: 46_800,
    price: '$1.99',
    image: heartopia,
  },
  { slug: 'palia', name: 'Palia', rating: 4.8, likesCount: 89_500, price: 'Free', image: palia },
  {
    slug: 'cat-mail-co',
    name: 'Cat Mail Co.',
    rating: 4.9,
    likesCount: 38_200,
    price: 'Free',
    image: catMail,
  },
];

export const leaderboard: LeaderboardRow[] = [
  {
    rank: 1,
    playerName: 'Alex_Pro99',
    gamesPlayed: 142,
    totalScore: 94_250,
    streakDays: 12,
    favoriteGameName: 'Heartopia',
  },
  {
    rank: 2,
    playerName: 'CozyGamer_x',
    gamesPlayed: 118,
    totalScore: 81_400,
    streakDays: 8,
    favoriteGameName: 'Cat Mail Co.',
  },
  {
    rank: 3,
    playerName: 'MatchMaster',
    gamesPlayed: 98,
    totalScore: 72_110,
    streakDays: 5,
    favoriteGameName: 'Tiny Glade',
  },
  {
    rank: 4,
    playerName: 'BubblePop',
    gamesPlayed: 87,
    totalScore: 65_900,
    streakDays: 3,
    favoriteGameName: 'Whisper of the House',
  },
  {
    rank: 5,
    playerName: 'SudokuGod',
    gamesPlayed: 74,
    totalScore: 59_320,
    streakDays: 2,
    favoriteGameName: 'Cat Chess',
  },
];
