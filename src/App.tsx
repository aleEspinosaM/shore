import Sidebar from './features/Sidebar';
import Placeholder from './common/placeholder';
import Contacts from './features/contacts';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Switch>
          <Route path='/pos' render={(rProps) => <Placeholder {...rProps} />} />
          <Route path='/contacts' exact render={(rProps) => <Contacts {...rProps} />} />
          <Route path='/invoices' render={(rProps) => <Placeholder {...rProps} />} />
          <Route path='/inventory' render={(rProps) => <Placeholder {...rProps} />} />
          <Route path='/reports' render={(rProps) => <Placeholder {...rProps} />} />
          <Route path='/settings' render={(rProps) => <Placeholder {...rProps} />} />
          <Route path='/imring' render={(rProps) => <Placeholder {...rProps} />} />
          <Redirect from='/' to='pos' />
        </Switch>
      </Router>
    </>
  );
}

export default App;