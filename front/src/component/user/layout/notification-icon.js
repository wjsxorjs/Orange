"use client";
import React, { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'
import NotificationUI from './notification-ui'
import ReactDOM from 'react-dom'

function NotificationIcon({ notificationCount, notifications }) {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);
  const buttonRef = useRef(null);
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current && 
        !notificationRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [notificationRef, buttonRef])

  const handleNotificationClick = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      <div>
        <button ref={buttonRef} onClick={toggleNotifications} style={{ background: 'none', border: 'none',cursor: 'pointer',padding: '8px',borderRadius: '50%',display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
          <Bell size={24} color="#333" />
          {notificationCount > 0 && (
            <div style={{ position: 'absolute',top: '0', right: '0', backgroundColor: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
              {notificationCount}
            </div>
          )}
        </button>
      </div>
      {isOpen && ReactDOM.createPortal(
        <div ref={notificationRef} onClick={handleNotificationClick} style={{ position: 'fixed', top: '60px', right: '20px',width: '28rem',zIndex: 9999,boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',background: 'white',borderRadius: '8px'}}>
          <NotificationUI notifications={notifications} />
        </div>,
        document.body
      )}
    </>
  )
}

export default NotificationIcon