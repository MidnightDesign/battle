import { DamageCharacter } from './DamageCharacter';
import HealCharacter from './HealCharacter';
import Spawn from './Spawn';
import { StartCooldown } from './StartCooldown';

export type AppAction =
    DamageCharacter |
    HealCharacter |
    Spawn |
    StartCooldown;
