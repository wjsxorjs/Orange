"use client"

import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, } from '@mui/material';

export default function FaqModal(props) {
  const open = props.faqOpen;
  const onClose = () => { props.handleFaqClose(); };

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const faqs = [
    {
      id: 1,
      question: '매너온도는 어떻게 계산되나요?',
      answer: '매너온도는 사용자의 거래 평가 및 상호작용에 따라 변화합니다.'
    },
    {
      id: 2,
      question: '고객 확인 제도란 무엇인가요?',
      answer: '고객 확인 제도는 거래 시 안전을 보장하기 위한 제도입니다.'
    },
    {
      id: 3,
      question: '거래가 취소되면 어떻게 해야 하나요?',
      answer: '거래가 취소될 경우, 고객센터를 통해 지원을 요청할 수 있습니다.'
    },
  ];

  const handleQuestionClick = (id) => {
    setSelectedQuestion(selectedQuestion === id ? null : id);
  };

  function goQna() {
    onClose(); 
    props.handleQnaOpen();
  }
  
  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: '650px', height: 'auto',  maxWidth: '90%', borderRadius: '16px', display: 'flex', flexDirection: 'column', },}}>
        <DialogTitle className="dialog-title" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginTop: '5px', position: 'relative', }} >
          자주 묻는 질문 🍊
          <Button onClick={onClose} sx={{ position: 'absolute', right: 10, top: 10, minWidth: '30px', fontSize: '18px', color: 'black', }}>X</Button>
        </DialogTitle>
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', flexGrow: 1, }}>
          <DialogContent sx={{ width: '90%', height: 'auto', overflow: 'auto', padding: 0, marginTop: '10px', paddingBottom: '10px', }}>
            <div className="faq-container"  style={{paddingTop : '0px'}}>
              <ul className="faq-list">
                {faqs.map((faq) => (
                  <li key={faq.id} className="faq-item" onClick={() => handleQuestionClick(faq.id)} >
                    <div className="faq-question">{faq.question}</div>
                    {selectedQuestion === faq.id && (
                      <div className="faq-answer">{faq.answer}</div>
                    )}
                  </li>
                ))}
              </ul>
              <Divider />
              <div className="help-section" style={{ marginTop: '30px', marginBottom: '20px' }}>
                <h3>도움이 필요하신가요?</h3>
                <Button className="inquiry-button" onClick={goQna} 
                  sx={{  backgroundColor: '#FF8000 !important', color: 'white !important', padding: '6px 16px !important', fontSize: '14px !important', minWidth: 'auto !important',
                    '&:hover': { backgroundColor: '#e67300 !important' },}}>
                  문의하기
                </Button>
              </div>
            </div>
          </DialogContent>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};