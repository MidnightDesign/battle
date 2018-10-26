import * as React from 'react';
import {CSSProperties} from 'react';
import {addUntil, subtractUntil} from '../../util/math';
import './Meter.css';

interface MeterProps {
    max: number;
    value: number;
}

interface MeterState {
    animatedValue: number;
    scheduledTick: number | undefined;
}

class Meter extends React.Component<MeterProps, MeterState> {
    public state: MeterState = {animatedValue: 0, scheduledTick: undefined};

    public render() {
        const {max, value} = this.props;
        const percentage = (this.state.animatedValue / max) * 100;
        const style = {'--percentage': percentage.toString(10)} as CSSProperties;
        return (
            <meter value={value} max={max} className="Meter" style={style}>
                <span className="label">{value}/{max}</span>
            </meter>
        );
    }

    public componentDidMount() {
        this.scheduleTick();
    }

    public componentDidUpdate() {
        this.scheduleTick();
    }

    private tick = () => {
        this.setState((previousState) => {
            const {animatedValue} = previousState;
            const targetValue = this.props.value;
            if (animatedValue === targetValue) {
                return;
            }
            const modifier = animatedValue > targetValue ? subtractUntil : addUntil;
            const newState = {
                ...previousState,
                animatedValue: modifier(animatedValue, (this.props.max / 100) * 2, targetValue),
            };
            this.scheduleTick();
            return newState;
        });
    }

    private scheduleTick() {
        if (this.state.scheduledTick !== undefined) {
            return;
        }
        const scheduledTick = requestAnimationFrame(() => {
            this.setState({scheduledTick: undefined});
            return this.tick();
        });
        this.setState({
            scheduledTick,
        });
    }
}

export default Meter;
