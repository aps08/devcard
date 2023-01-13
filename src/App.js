import { Route, Routes} from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
        <>
          <Header />
          <main>
            <p>main body here</p>
          </main>
          <Footer />
        </>
  );
}

export default App;
