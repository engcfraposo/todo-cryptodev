import { TaskList } from './components/TaskList'
import { Header } from "./components/Header";
import GlobalStyle from './styles/global';
import {TaskProvider} from "./hooks/TaskProvider";

export function App() {
  return (
      <TaskProvider>
        <Header />
        <TaskList />
        <GlobalStyle />
      </TaskProvider>
  )
}