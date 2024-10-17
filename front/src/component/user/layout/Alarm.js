// 'use client'

// import React, { useState, useEffect } from 'react'
// import { AlertTriangle, X } from 'lucide-react'

// export default function BottomLeftAlert() {
//    const [isVisible, setIsVisible] = useState(false)
//   const [alarm, setAlarm] = useState('알림을 기다리는 중...');
//   const eventSource = new EventSource("http://localhost:8080/subscribe");
//   useEffect(() => {
//     eventSource.addEventListener("notification", function (event) {
//       const notification = event.data;
//       console.log(notification);
//       setAlarm(notification);
//       alert(notification);
//     })
//   });
//   eventSource.onerror = function () {
//     console.error("SSE 연결이 끊어졌습니다.");
//     eventSource.close();
//   };
//   useEffect(() => {
//     setIsVisible(true)
//     // const timer = setTimeout(() => {
//     //   setIsVisible(false)
//     // }, 5000)

//     return () => clearTimeout(timer)
//   }, [])

//   if (!isVisible) return null

//   return (
//     <div style={{
//       position: 'fixed',
//       bottom: '16px',
//       right: '16px',
//       maxWidth: '24rem',
//       zIndex: 50
//     }} role="alert">
//       <div style={{
//         backgroundColor: '#fff8ed',
//         borderLeft: '4px solid #fb923c',
//         padding: '16px',
//         display: 'flex',
//         alignItems: 'center',
//         boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
//         borderRadius: '0.5rem'
//       }}>
//         <img src='/img/Orange_img.png' style={{
//           height: '24px',
//           width: '20px',
//           marginRight: '12px'
//         }} aria-hidden="true" />
//         <span style={{
//           color: '#9a3412',
//           flexGrow: 1
//         }}>{alarm}</span>
//         <button
//           onClick={() => setIsVisible(false)}
//           style={{
//             marginLeft: '8px',
//             color: '#fb923c',
//             cursor: 'pointer',
//             outline: 'none'
//           }}
//           onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #fb923c'}
//           onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
//           aria-label="알림 닫기"
//         >
//           <X style={{ height: '20px', width: '20px' }} />
//         </button>
//       </div>
//     </div>
//   )
// }
