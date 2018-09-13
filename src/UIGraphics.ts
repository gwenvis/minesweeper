import { Position } from "./position";
import { SmileyStates } from "./states/smileystates";

export const NumberRegions = [
    new Position(128,2), // 0
    new Position(2,2), // 1
    new Position(16,2), // 2
    new Position(30,2), // 3
    new Position(44,2), // 4
    new Position(58,2), // 5
    new Position(72,2), // 6 
    new Position(86,2), // 7
    new Position(100,2), // 8  
    new Position(114,2), // 9
]

export const NumberSize:Position = new Position(13,23);

export const SmileyRegions = new Map<Number, Position>([
    [SmileyStates.Neutral, new Position(0,0)],
    [SmileyStates.Neutral, new Position(0,0)],
]);

export const SmileySize:Position = new Position(26,26);