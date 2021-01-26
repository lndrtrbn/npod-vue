import { Container } from 'inversify'
import { CursorHoverService } from './shared/services/cursor-hover.service';

const DIContainer = new Container();

// ====================================
// === Import here all dependancies ===
// ====================================
// Use : DIContainer.get(X) to retrieve a dependancy.

DIContainer.bind<CursorHoverService>(CursorHoverService).toSelf();

// ====================================

export default DIContainer;