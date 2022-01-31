import { useState, useEffect } from 'react';
import './win.css';

export function Win() {
  const [show, setShow] = useState(0);

  useEffect(() => {
    if (show === 0) {
      setTimeout(() => {
        setShow(1);
        setTimeout(() => {
          setShow(2);
        }, 5000);  
      }, 1000);
    }
  }, []);

  return show === 1 ? (
    <div className="win">
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
     </div>
    </div>
  ) : null;
}