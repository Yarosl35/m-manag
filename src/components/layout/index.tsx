import { FC } from 'react';
import './index.css';
import TopBar from './TopBar';

interface Props{}
const Layout: FC<Props> = ({ children }) => (
  <div className="styleMainBlock">
    <TopBar />
    {children}
  </div>
);
export default Layout;
