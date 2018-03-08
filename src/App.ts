import { Container, Subscribe } from 'dojo2-stateful';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { w, v } from '@dojo/widget-core/d';
import * as css from './App.m.css';

interface CounterState {
	count: number
};

class CounterContainer extends Container<CounterState> {
	state = {
	  count: 0
	};
	increment = (step: number) => {
	  this.setState({ count: this.state.count + step });
	}
	decrement = (step: number) => {
	  this.setState({ count: this.state.count - step });
	}
}

class StepContainer extends Container<{ step: number }> {
	state = {
	  step: 1
	};
	setStep = (step: number) => {
		this.setState({ step });
	}
}

class Counter extends WidgetBase {
	render() {
		return w(Subscribe, {
			to: [CounterContainer, StepContainer],
			render: (counter: CounterContainer, step: StepContainer) => {
				return v('div', [
					v('button', {
						classes: css.counterButton,
						onclick: () => counter.decrement(step.state.step)
					}, [ 'Decrement' ]),
					v('span', {
						classes: [ css.label, css.counter ]
					}, [ `${counter.state.count}` ]),
					v('button', {
						classes: css.counterButton,
						onclick: () => counter.increment(step.state.step)
					}, [ 'Increment' ])
				])
			}
		});
	}
}

class Count extends WidgetBase {
	render() {
		return w(Subscribe, { to: [CounterContainer], render: (counter: CounterContainer) => {
			return v('div', { classes: css.controlContainer }, [
				v('span', { classes: css.label }, [ 'Current Count:' ]),
				v('span', { classes: css.label }, [ `${counter.state.count}` ])
			])
		}})
	}
}

class Step extends WidgetBase {
	render() {
		return w(Subscribe, { to: [StepContainer], render: (step: StepContainer) => {
			return v('div', { classes: css.controlContainer }, [
				v('span', { classes: css.label }, [ 'Set increment value: ' ]),
				v('input', {
					type: 'number',
					oninput: (event: any) => step.setStep(parseInt(event.target.value))
				})
			]);
		}})
	}
}

export default class App extends WidgetBase {
	render() {
		return v('div', [ w(Counter, {}), w(Count, {}), w(Step, {}) ]);
	}
}
