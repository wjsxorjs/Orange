"use client";
import React, { useEffect, useState } from 'react'
import { Settings, MoreVertical, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from "js-cookie";
import dayjs from 'dayjs'

function NotificationUI({ notifications }) {
  const [activeTab, setActiveTab] = useState('알림');
  const [activeFilter, setActiveFilter] = useState('전체');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [displayCount, setDisplayCount] = useState(5);
  const [userkey, setUserkey] = useState(Cookies.get("userkey"));
  const router = useRouter(); // useRouter 훅은 항상 호출됨

  const handleNotificationClick = async (notification) => {
    let redirectPath = '';
    let tempQuery = '';
    if (notification.category === "채팅") {
      redirectPath = "/chat"; // 리디렉션 경로 가져오기
      tempQuery = { chatroomkey: notification.redirection }; // 쿼리 파라미터 설정
    } else if (notification.category === "후기") {
      redirectPath = notification.redirection;
    } else if (notification.category === "문의") {
      redirectPath = notification.redirection;
    }
    const query = new URLSearchParams(tempQuery).toString();

    // 쿼리 파라미터를 URL에 추가하기
    const fullPath = `${redirectPath}?${query}`;
    try {
      await axios.get("/deleteNotification", {
        params: {
          alarmkey: notification.alarmkey,
          message: notification.message,
          redirection: notification.redirection
        }
      }).then(
        window.location.href = fullPath
      );
    } catch (error) {
    }
  };

  const groupedNotifications = notifications.reduce((acc, notification) => {
    const key = notification.message; // 메시지를 키로 사용
    if (!acc[key]) {
      acc[key] = { ...notification, count: 1 }; // 첫 번째 항목 추가
    } else {
      acc[key].count += 1; // 동일 메시지 수 증가
    }
    return acc;
  }, {});

  const displayNotifications = Object.values(groupedNotifications);

  const removeAllAlarm = () => {
    axios.get("/deleteAllAlarms", {
      params: {
        userkey: userkey
      }
    }).then(() => {
      // 요청이 완료된 후 페이지 새로고침
      window.location.reload();
    })
  }

  const moreAlarms = () => {
    setDisplayCount(notifications.length);
  };

  const fewerAlarms = () => {
    setDisplayCount(5);
  };

  return (
    <div style={{ padding: '1rem 0.625rem', maxWidth: '440px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '1rem' }}>
        <button
          onClick={removeAllAlarm}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem',
            backgroundColor: isHovered ? '#FB923C' : '#FFF7ED',
            color: isHovered ? 'white' : '#FB923C',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        >
          <Check size={16} style={{ marginRight: '0.25rem' }} />
          모두 읽음 처리
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: displayCount > 5 ? '620px' : '400px',
          overflowY: 'auto',
          paddingRight: '0.5rem',
        }}
      >
        {displayNotifications.slice(0, displayCount).map((notification, index) => (
          <React.Fragment key={notification.alarmkey}>
            {index > 0 && (
              <div
                style={{
                  height: '1px',
                  backgroundColor: '#FED7AA',
                  margin: '0.5rem 0',
                }}
              />
            )}
            <div
              onClick={() => handleNotificationClick(notification)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.3125rem 0.5rem',
                borderRadius: '0.25rem',
                backgroundColor: hoveredIndex === index ? '#FFF7ED' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              <div style={{ flex: '1', minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: '600', color: '#C2410C' }}>{notification.category}</span>
                  <span style={{ fontSize: '0.75rem', color: '#F97316', whiteSpace: 'nowrap' }}>{dayjs(notification.create_dtm).format('MM-DD hh:mm A')}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#EA580C', margin: '0.25rem 0', wordBreak: 'break-word' }}>{notification.message}</p>
              </div>
              {notification.count > 1 && (
                <div style={{
                  backgroundColor: '#FB923C',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                }}>
                  {notification.count}
                </div>
              )}
              <button
                style={{
                  color: '#FB923C',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  borderRadius: '0.25rem',
                  transition: 'background-color 0.3s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation()
                  e.currentTarget.style.backgroundColor = '#FFF7ED'
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation()
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
      {displayCount === 5 && displayNotifications.length > 5 && (
        <button
          onClick={moreAlarms}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '0.5rem',
            marginTop: '1rem',
            backgroundColor: '#FFF7ED',
            color: '#FB923C',
            border: '1px solid #FB923C',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            transition: 'background-color 0.3s ease',
          }}
        >
          <ChevronDown size={16} style={{ marginRight: '0.25rem' }} />
          더 보기
        </button>
      )}
      {displayCount >= 6 && (
        <button
          onClick={fewerAlarms}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '0.5rem',
            marginTop: '1rem',
            backgroundColor: '#FFF7ED',
            color: '#FB923C',
            border: '1px solid #FB923C',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            transition: 'background-color 0.3s ease',
          }}
        >
          <ChevronUp size={16} style={{ marginRight: '0.25rem' }} />
          접기
        </button>
      )}
    </div>
  );
}

export default NotificationUI
