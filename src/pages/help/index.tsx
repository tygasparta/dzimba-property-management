import { Route, Routes } from 'react-router-dom';
import Help from '../Help';
import Documentation from './Documentation';
import KnowledgeBase from './KnowledgeBase';
import Training from './Training';
import Contact from './Contact';
import Chat from './Chat';

const HelpRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Help />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/knowledge-base" element={<KnowledgeBase />} />
      <Route path="/training" element={<Training />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default HelpRoutes; 