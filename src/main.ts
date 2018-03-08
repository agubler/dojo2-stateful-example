import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import Registry from '@dojo/widget-core/Registry';
import { createStatefulProvider } from 'dojo2-stateful';
import App from './App';

const registry = new Registry();
createStatefulProvider(registry);

const element = document.getElementById('app')!;
const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties({ registry });
projector.append(element);
