import './App.css'
import AuthProvider from './components/AuthProvider';
import RouteContainer from './components/RouteContainer';


function App() {
  return (
    <AuthProvider>
      <RouteContainer />
    </AuthProvider >
  )
}

export default App;