import React, { useState } from 'react';
import menu from './assets/menu.png';
import post from './assets/post.png';
import message_icon from './assets/message_icon.png';
import settings from './assets/settings.png';
import openbook from './assets/openbook.png';
import portfolio from './assets/portfolio.png';
import diamond from './assets/diamond.png';

function Sidebar({ recentPrompts }) {
  const [expand, setExpand] = useState(false);

  return (
    <div className='bg-zinc-700 h-screen fixed'>
      <div>
        <img onClick={() => setExpand(prev => !prev)} className="wt-6 w-6 filter invert" src={menu} alt="logo" />
        <div className="newchat flex gap-4 mt-8">
          <img src={post} alt='new chat' className='w-6 wt-3 filter invert'/>
          {expand ? <div className='text-lg mt-3'>New Chat</div> : null}
          {expand ? <img className="w-7 w-3 filter invert" src={message_icon} alt="new chat"/> : null}
        </div>
        <div className='middle mt-4'>
          {expand ? <h1>Gems</h1> : null}
          
          {expand ? <div className='flex gap-4 mt-4'>
            <img src={openbook} className='w-6 mt-3.5'/>
            <p className='mt-3.5'>Storybook</p>
          </div> : null}
          {expand ? <div className='flex gap-4 mt-4'>
            <img src={portfolio} className='w-6 mt-3.5'/>
            <p className='mt-3.5'>Career guide</p>
          </div> : null}
          {expand ? <div className='flex gap-4 mt-4'>
            <img src={diamond} className='w-6 mt-3.5'/>
            <p className='mt-3.5'>Explore Gems</p>
          </div> : null}
        </div>
        
        
        {expand ? (
          <div className='recent-chats ml-2  w-fit text-xl mt-10'>
             <h1>Recent</h1> 
            {recentPrompts.map((item) => (
              <div key={item.id} className='message'>
                <p className='mt-5'>{item.text}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      
      <div className="absolute bottom-4 left-0 flex gap-2 items-center">
        <img src={settings} alt='settings' className='filter invert w-5 h-5'/>
        {expand ? <p className='text-g whitespace-nowrap overflow-hidden text-ellipsis'>Settings and Help</p> : null}
      </div>
    </div>
  );
}

export default Sidebar;