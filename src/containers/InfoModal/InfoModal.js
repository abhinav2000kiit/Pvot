import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import logo from '../../assets/logo/logo.png';

import './InfoModal.scss';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);
const useMountEffect = fun => React.useEffect(fun, []);

const InfoModal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = React.useState(0);
  const [qns, setQns] = React.useState([
    { qn: 'Hello there smarty! What’s your name?', type: 'text' },
    {
      qn:
        'Welcome to Pvot! I am your digital assistant P-bot and I will help you get started. On Pvot, there are many kinds of Stock Market Experts And what kind of Expert are you?',
      type: 'option',
      options: ['Fundamental', 'Technical', 'Both']
    },
    {
      qn: 'Good to know that! Are you SEBI Registered RIA or NISM Certified Analyst?',
      type: 'option',
      options: ['Yes', 'No']
    },
    {
      qn: [
        'That’s great! Our team will reach out to you for further verification. Once verified and profile set up, investors would be able to subscribe to your trading activity on the platform. I will always be available within the app under the “more” section. Feel free to ping me if you are stuck somewhere.',
        'We welcome everyone! Pvot is designed to recognize smart talent.'
      ],
      type: 'end'
    }
  ]);
  const [qnType, setQnType] = React.useState(qns[0]['type']);
  const [ans, setAns] = React.useState([]);
  const [state, setState] = React.useState();
  const [buttonOptions, setButtonOptions] = React.useState([]);
  const messagesEndRef = React.useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    window.setTimeout(handleOpen, 1000);
  }, []);

  useMountEffect(() => scrollToRef(messagesEndRef));

  const showQuestion = qn => {
    return (
      <div className='mb-2'>
        <div className='shadow bg-white rounded-right rounded question_text mr-auto'>
          <p className='py-2 px-2 text-dark'>{qn}</p>
        </div>
      </div>
    );
  };

  const showAns = ans
    ? Object.values(ans).map((ansObject, i) => {
        return (
          <div key={i}>
            <div className='mb-2'>
              <div className='shadow bg-primary rounded-left rounded question_text ml-auto'>
                <p className='py-2 px-2 text-white'>{ansObject.reply} </p>
              </div>
            </div>
            <div ref={messagesEndRef}></div>
            {showQuestion(
              ansObject.clicked === 2
                ? ansObject.reply === 'Yes'
                  ? ansObject.showQuestion[0]
                  : ansObject.showQuestion[1]
                : ansObject.showQuestion
            )}
          </div>
        );
      })
    : null;

  const ansButton = buttonValues => {
    const buttonArray = [];
    buttonValues.map((value, i) => {
      buttonArray.push(
        <button
          key={i}
          type='button'
          id={value}
          value={value}
          onClick={() => onAnsButtonClick(value)}
          className='btn btn-outline-primary btn-sm col mx-1 rounded-pill'
        >
          {value}
        </button>
      );
    });
    return buttonArray;
  };

  const inputChange = e => {
    setState({ [e.target.id]: e.target.value });
  };

  const onAnsButtonClick = data => {
    let reply =
      qnType === 'option'
        ? clicked === 1
          ? `I am a ${data} Expert`
          : `${data}`
        : qnType === 'text'
        ? state['textReply']
        : null;

    let showQuestion =
      clicked === 0 ? `Hi ${data.textReply.split(' ')[0]}. ${qns[clicked + 1]['qn']}` : qns[clicked + 1]['qn'];
    setAns([...ans, { clicked, reply, showQuestion, qnType }]);
    setQnType(qns[clicked + 1]['type']);
    setClicked(clicked + 1);
    if (qns[clicked + 1]['type'] === 'option') {
      setButtonOptions(qns[clicked + 1]['options']);
    }
    scrollToRef(messagesEndRef);
  };

  const onSubmitClick = e => {
    e.preventDefault();
    let listOfQnAns = [];
    for (let i = 0; i < ans.length; i++) {
      let qnAns = { ...qns[i], ...ans[i] };
      delete qnAns.type;
      delete qnAns.clicked;
      delete qnAns.showQuestion;
      delete qnAns.qnType;
      listOfQnAns.push(qnAns);
    }
    console.log(listOfQnAns);
    setOpen(false);
  };

  // const scrollToBottom = () => {
  //   scrollToRef(messagesEndRef);
  // };

  // React.useEffect(() => {
  //   scrollToBottom();
  // }, [qns]);

  // console.log(clicked, qns, ans, qnType, buttonOptions);

  return (
    <div>
      <Fab color='primary' aria-label='edit' onClick={handleOpen} className='modalFab'>
        <QuestionAnswerOutlinedIcon />
      </Fab>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className='modalView rounded-md bg-white px-3 py-3'>
            <div className='chatheader row mb-3'>
              <img src={logo} alt='pvotLogo' className='mx-auto' />
            </div>
            <div className='chatbox py-2'>
              {showQuestion(qns[0]['qn'])}
              {showAns}
            </div>
            {clicked < qns.length ? (
              qnType === 'option' ? (
                <div className='chatbuttons row justify-content-center py-3 my-auto' role='group'>
                  {ansButton(buttonOptions)}
                </div>
              ) : qnType === 'text' ? (
                <form className='chatbuttons input-group input-group-sm'>
                  <input
                    type='text'
                    onChange={inputChange}
                    id='textReply'
                    className='form-control mr-1 my-auto rounded border-primary'
                  />
                  <div className='input-group-append'>
                    <IconButton
                      type='submit'
                      onClick={() => onAnsButtonClick(state)}
                      color='primary'
                      className='ml-1 my-auto'
                    >
                      <SendRoundedIcon />
                    </IconButton>
                  </div>
                </form>
              ) : qnType === 'end' ? (
                <div className='chatbuttons row py-2'>
                  <button
                    type='button'
                    onClick={onSubmitClick}
                    className='btn btn-primary mx-1 my-1 p-1 rounded-circle mx-auto shadow'
                  >
                    <ArrowRightAltIcon fontSize='large' />
                  </button>
                </div>
              ) : null
            ) : null}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default InfoModal;
