import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Middle from './Middle';


function App() {
  const [recentPrompts, setRecentPrompts] = useState([]);

  return (
    <div className='flex'>
    
      <Sidebar   recentPrompts={recentPrompts} /> 
    
      <Middle setRecentPrompts={setRecentPrompts} /> 
    </div>
  );
}

export default App;