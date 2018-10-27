import Character from '../../model/Character';
import Attack from './Attack';

export type SchedulableAction = Attack;

export default interface ScheduleAction {
    character: Character;
    type: 'SCHEDULE_ACTION';
    action: SchedulableAction;
}

export const scheduleAction = (character: Character, action: SchedulableAction): ScheduleAction => ({
    action,
    character,
    type: 'SCHEDULE_ACTION',
});
