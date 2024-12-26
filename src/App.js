import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [title, setTitle] = useState(['가즈아', '나싫어', '다피라져라라라라', '12345676']);
  let [body, setBody] = useState(['내용이다아', '내용아니다', '꺼저라내용아', '아잼있어죽겠다내용']);
  let [id, setid] = useState("id");
  let nextid = 0;


  const [board, setBoard] = useState([{ id: 1, title: '가즈아', body: '나싫어 꺼져' },
  { id: 2, title: '내용이지', body: '내용인데 뭐해' },
  { id: 3, title: '다구려', body: '진짜로 다구려' }]);

  let [mode, setMode] = useState('WELCOME!!');
  let content = "welcome";
  let board2;


  //-------------------------------------생성--------------------------
  console.log('start ' + mode);
  if (mode == 'CREATE') {
    console.log('CREATE START!!');
    content = <Create onCreate={(_tilte, _body) => {

      let nextid = Number(board.length) + 1;
      console.log('변수따로' + nextid);

      console.log('몇이노  ' + nextid);
      const newboard = { id: nextid, title: _tilte, body: _body };
      // let ttile = [...title];
      // let tbody = [...body];
      console.log(newboard[0]);
      board2 = [...board]
      board2.push(newboard);
      console.log(board2);
      setBoard(board2);
      for (let g = 0; g < board2.length; g++) {
        console.log(board2[g])
      }

      setMode('WELCOME');

    }}></Create>
  }

 

  //-------------------------------------수정--------------------------
  if (mode == 'UPDATE') {
    console.log('UPDATE START');

    let title, body;
    for (let g = 0; g < board.length; g++) {
      if (id == board[g].id) {
        title = board[g].title;
        body = board[g].body;
      }

    }

    content = <Update id={id} body={body} title={title} onUpdate={(updateRow) => {


      board2 = [...board];
      for (let h = 1; h < board2.length; h++) {
        if (board2[h].id == updateRow.id) {
          board2[h] = updateRow;
        }
      }

      setBoard(board2);

      for (let g = 0; g < board.length; g++) {
        console.log(board[g])
      }

      setMode('WELCOME');

    }}></Update>
  }
  function updateboard(id){
    setid(id);
    setMode('UPDATE');
  }

  function deleteboard(id){
    const newboard = [];
    alert(id);
    for (let r = 0; r < board.length; r++) {
      if (id !== board[r].id) {
        newboard.push(board[r]);

      }
      setBoard(newboard);
    }

    
  }

  //------------------------------------------메인ui화면 각 function ui 조합-------------------------------

  return (
    <>
      <Header onClick={() => { alert("해까리"); }}></Header>
      <Body board={board} onChageMode={(id) => updateboard(id)} deleteboard={(id)=>{deleteboard(id)}}  />

      <Tail body={body} title={title} onChageMode={(id) => { alert(id) }} />
      <p><a href='/Create' onClick={event => {
        event.preventDefault();
        //let tmode = mode;
        //tmode ="CREATE";
        //setMode(tmode);
        //console.log(mode);
        setMode('CREATE');  //이거는 왜 않되는걸까????
        console.log(mode);
      }}  >CREATE</a></p>

      {content}
    </>
  );
}


//---------------------Tail ui funtion -------------------------------------------
function Tail(props) {


  let bb = [];
  for (let i = 0; i < props.title.length; i++) {
    bb.push(<li key={props.title[i]} ><a href='/list' id={props.body[i]}
      onClick={(event) => { props.onChageMode(event.target.id) }}>{props.title[i]}</a></li>);
  }

  return (
    <div className="modal">
      {bb}
    </div>

  )
}

//-------------------------body ui funtion----------------
function Body(props) {

  let [ff, fnc] = useState(0);

  let body2 = props.board;


  let gridbody = [];


  for (let a = 0; a < body2.length; a++) {
    gridbody.push(<p>{body2[a].id} <a href='UPDATE' onClick={event => {
      event.preventDefault();

      props.onChageMode(body2[a].id);


    }}  > {body2[a].title}</a> <button onClick={event => {
      event.preventDefault();
      props.deleteboard(body2[a].id);
    }} >삭제</button></p>);

  }

  function name1() {

    fnc(ff + 1);
  }


  return (
    <div className="list"  >
      <span onClick={name1} >좋아용!!👍</span>{ff}
      {gridbody}
    </div>
  )

}

//----------------------------------------------create ui function -------------------------------------
function Create(props) {
  return <article>

    <h2>Create</h2>
    <form onSubmit={(event) => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);

    }} >
      <p><input type="text" name="title" placeholder="써보숑" /></p>
      <p><textarea name="body" placeholder="길게써보숑" /></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}

//----------------------------------------------update ui function -------------------------------------
function Update(props) {

  console.log("!!!!!!!!!!!!!!!" + props.body);

  const [body, setBody] = useState(props.body);
  const [title, setTitle] = useState(props.title);

  return <article>

    <h2>{props.id} Update</h2>
    <form onSubmit={(event) => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;


      let update_row = { id: props.id, title: title, body: body };
      props.onUpdate(update_row);

    }} >


      <p><input type="text" name="id" value={props.id} /></p>
      <p><input type="text" name="title" value={title} onChange={(event) => { setTitle(event.target.value) }} /></p>
      <p><textarea name="body" value={body} onChange={(event) => { setBody(event.target.value) }} /></p>
      <p><input type="submit" value="update" /></p>
    </form>
  </article>
}


//-------------------------ㅡ탑화면---------------------------
function Header(props) {

  let [stylecoler, changecoler] = useState('black-nav');

  function clickstart() {

    let change1 = 'white-nav'
    changecoler(change1);
    console.log(stylecoler);
    props.onClick();

  }

  return (
    <div >
      <header className={stylecoler} onClick={clickstart}>
        <h4>가즈아</h4>
      </header>
    </div>
  )
}

export default App;
