'use client'

import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, ListItemSecondaryAction } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import axios from 'axios';

export default function Manner({ userKey, onMannerCountChange }) {
  const API_URL = "/api/user/manner/getManner";

  const [list, setList] = useState([]);
  const [goods, setGoods] = useState([]);
  const [bads, setBads] = useState([]);
  const userkey = userKey;

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get(API_URL, {
      params: { userkey: userkey }
    }).then((res) => {
      setList(res.data.m_ar || []);
      const goodList = (res.data.m_ar || []).filter(item => item.preference == 1 || item.preference == 2 || item.preference == 4 || item.preference == 5);
      const badList = (res.data.m_ar || []).filter(item => item.preference == 0 || item.preference == 3);
      setGoods(goodList);
      setBads(badList);
      const totalCount = (res.data.m_ar || []).reduce((sum, item) => sum + item.count, 0);
      onMannerCountChange(totalCount);
    });
  }
  
  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      {/* 매너 */}
      <Box sx={{ marginBottom: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SentimentSatisfiedAltIcon color="primary" />
          <Typography variant="subtitle1" sx={{ marginLeft: 1, color: 'black', fontWeight: 'bold' }}>받은 매너 칭찬</Typography>
        </Box>
        <Divider sx={{ borderColor: '#e0e0e0', borderWidth: '0.5px', margin: 1 }} />
        <List>
          {goods.length > 0 ? (
            goods.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText primary={item.review} sx={{ color: 'black' }} />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PeopleAltIcon sx={{ color: 'gray', marginRight: 0.5 }} />
                      <Typography sx={{ color: 'gray' }}>{item.count}</Typography>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < goods.length - 1 && <Divider sx={{ borderColor: '#e0e0e0', borderWidth: '0.5px' }} />}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="받은 매너 칭찬이 없어요." sx={{ color: 'black' }} />
            </ListItem>
          )}
        </List>
      </Box>

      <Divider sx={{ borderColor: 'gray', borderWidth: '0.7px', marginBottom: 2 }} />

      {/* 비매너 */}
      <Box sx={{ marginBottom: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SentimentDissatisfiedIcon color="error" />
          <Typography variant="subtitle1" sx={{ marginLeft: 1, color: 'black', fontWeight: 'bold' }}>받은 비매너</Typography>
        </Box>
        <Divider sx={{ borderColor: '#e0e0e0', borderWidth: '0.5px', margin: 1 }} />
        <List>
          {bads.length > 0 ? (
            bads.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText primary={item.review} sx={{ color: 'black' }} />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PeopleAltIcon sx={{ color: 'gray', marginRight: 0.5 }} />
                      <Typography sx={{ color: 'gray' }}>{item.count}</Typography>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < bads.length - 1 && <Divider sx={{ borderColor: '#e0e0e0', borderWidth: '0.5px' }} />}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="받은 비매너가 없어요." sx={{ color: 'black' }} />
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
}
