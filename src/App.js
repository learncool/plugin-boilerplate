import React from 'react';
import { useState } from 'react';
import moment from "moment"
import { useEffect } from 'react';
///Structure of user db



let Questions = [
  "Is Python a object oriented programming language?",
  "What are Dicts?",
  "What is bubbling?",
  "Python doesn't hoist functions?"
]




function App(props) {
  useEffect(()=>{
    fetchData()
  }, [props.pluginsData, props.count])

  function fetchData(){
    let pluginsData =  []
    pluginsData = props.pluginsData;
    console.log(pluginsData,"hh")

    if(pluginsData){
                let new_data = pluginsData
                console.log(new_data)
                if(new_data && new_data.users_response && new_data.users_response.length){ //from props
                    let users_answers = []
                    users_answers = new_data.users_response.filter(data => data.id === props.user.id) //props
                    if(users_answers.length){
                        setAnswers(users_answers[0].answers)
                        setDate(users_answers[0].last_updated)
                    }
                }
                setDisabled(new_data.disabled_users)
                setCount(count+1)
                setDbTemplate(new_data)
            }
  }

  const [answers, setAnswers] = useState([])
  const [tab, setTab] = useState("users")
  const [last_updated, setDate] = useState("")
  const [disabled_list, setDisabled] = useState([])
  const [count, setCount] = useState(0)
  const [db_template, setDbTemplate] = useState({
    "users_response" : [],
    "answers":{
        "a": "sdfsg",
    },
    "disabled_users": []
    })

  function submitData(){
    if(answers.length < Questions.length){
      alert("Answer all the questions before you submit")
      return false
    }
    let index;
    db_template.users_response.map((data, i) => {
      if(data.id === props.user.id){
        index = i+1
    }})
    let new_date = new Date()
    let new_data = db_template
    console.log(answers, new_data)
    if(index){
        console.log("HER IN UPDATE")
        new_data.users_response[index-1].answers = answers
        new_data.users_response[index-1].last_updated = new_date.toISOString()
        setDbTemplate(new_data)
        setCount(count+1)
      //pass the data further
        props.updateDb(new_data).then(res=>{
          alert(res)
        }).catch(err=>{
          alert(err)
        })

    } else{
      console.log("IN NEW")
      let new_user_entry = {}
      new_user_entry["id"] = props.user.id;
      new_user_entry["name"] = props.user.name;
      new_user_entry["image"] = props.user.image;
      new_user_entry["last_updated"] = new_date.toISOString()
      new_user_entry["answers"] = answers
      new_data.users_response.push(new_user_entry)
      setDbTemplate(new_data)
      setCount(count+1)
      //pass the payload further
      props.updateDb(new_data).then(res=>{
        alert(res)
      }).catch(err=>{
        alert(err)
      })
    }
  }

 

  function addToDisabled(user_id){
    console.log(db_template)
    let new_data = db_template
    let list = disabled_list
    if(list.length){
      let current_index = list.indexOf(user_id)
      if(current_index >= 0){
        list.splice(current_index, 1)
        setDisabled([...list])
        new_data.disabled_users = list
        setDbTemplate(new_data)
        setCount(count+1)
    //pass the payload further
        props.updateDb(new_data).then(res=>{
          alert(res)
        }).catch(err=>{
          alert(err)
        })
        return true
      }
    }
    list.push(user_id)
    setDisabled([...list])
    new_data.disabled_users = list
    setDbTemplate(new_data)
    setCount(count+1)
    //pass the payload further
    props.updateDb(new_data).then(res=>{
      alert(res)
    }).catch(err=>{
      alert(err)
    })
  }


  function setAnswer(i, answer){
    answers[i] = answer
    setAnswers([...answers])
  }
  return (
    <div className="averta-light pb-l" style={{padding:20, background:"white", borderRadius:7, }}>
      {props.admin ?
      <div>
        <header className="App-header" style={{"backgroundColor":"#282c34","minHeight":"10vh","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center","fontSize":"calc(10px + 2vmin)","color":"white"}}>
        <h2>Admin Panel</h2>
      </header>
        <div className='ui equal width grid p-s pb-m pt-m'>
          <div className='column cursor text-center' onClick={()=>setTab('users')} style={{background:  tab === 'users' ?  'wheat':  "aliceblue"}}>
            <img src='https://image.flaticon.com/icons/svg/476/476863.svg' width='20'  className='v-middle' />
            <span  className="pl-xs v-middle averta">Users</span>
          </div>

          <div  className='column cursor text-center' onClick={()=>setTab('answers')} style={{background:  tab !== 'users' ?  'wheat':  "aliceblue"}}>
            <img src='https://image.flaticon.com/icons/svg/942/942752.svg' className='v-middle'  width='20'/>
            <span className='pl-xs v-middle averta'>Answers</span>
          </div>
        </div>
        {tab === 'users' ?
          props.members.map(user=>
          <div className='ui feed user-created-post-container feed-item'>
            <div className="event">
              <div className="label" id="user-image">
                <img src={user.imageUrl} className="user-created-image" />
              </div>

              <div className="user-created-post content" style={{verticalAlign: 'middle'}}>
                <div className="summary">{user.name}</div>
                <div className="date">{user.locations.length ? user.locations[0].city ? user.locations[0].city: "N/A" : 'N/A'}</div>
              </div>

              
            </div>
            {console.log(disabled_list)}
            <div className='mt-xs'>
                <div onClick={()=>addToDisabled(user.id)} className='p-s cursor' style={{display:"inline-block", background:"whitesmoke", borderRadius:3}}>
                  {disabled_list.indexOf(user.id) < 0  ? <img src='https://image.flaticon.com/icons/svg/269/269149.svg' width='20px' className='v-middle'/> : <img src='https://image.flaticon.com/icons/svg/291/291201.svg'  width='20px' className='v-middle'/>}
                  <span className='v-middle pl-s'>{disabled_list.indexOf(user.id) < 0  ? 'Disable' : 'Enable'} plugin for this user</span>
                </div>

                {/* <div className='p-s'>
                  <img src='https://image.flaticon.com/icons/svg/269/269149.svg' width='20px' className='v-middle'/> 
                  <span className='v-middle pl-s'>Disable plugin for this user</span>
                </div> */}
              </div>
          </div>)

        :
        null
        }
        {tab === 'answers' ? db_template["users_response"].length  ?
        <div className='mt-s'>
          {db_template["users_response"].map(user =>{
            return(
              <div className='ui feed user-created-post-container feed-item'>
              <div className="event">
                <div className="label" id="user-image">
                  <img src={user.image} className="user-created-image" />
                </div>

                <div className="user-created-post content" style={{verticalAlign: 'middle'}}>
                  <div className="summary">{user.name}</div>
                  <div className="date">{moment(user.last_updated).format("YYYY-MM-D")}</div>
                </div>
              </div>
              <div className="pt-0 text-center" style={{fontFamily: 'averta-bold', color: 'rgba(0, 0, 0, 0.40)', fontSize: '1rem'}}>Answers ({"Last updated: " + moment(user.last_updated).fromNow()})</div>
              <div className='mt-s pt-xs' style={{overflow: 'auto',maxHeight: '150px',background: '#f1f1f1',boxShadow: '0px 11px 0px 14px #f1f1f1'}}>
                {Questions.map((data, i)=>{
                  return<div className='mt-xs pl-s p-xxs averta-light' style={{fontSize:'0.7rem'}}>
                            <h5 className='mb-0 pb-0 averta' style={{fontSize:'0.9rem'}}>{i+1}. {data}</h5>
                              <p className='ml-s p-xs' style={{display:"inline-block", background: '#d8bfd861', borderRadius:3}}>{user.answers[i]}</p>
                          </div>
                  })}
              </div>
              
            </div>
            )  
        })}
        </div>
        :
        <div className="pt-xs text-center" style={{fontFamily: 'averta-bold', color: 'rgba(0, 0, 0, 0.15)', fontSize: '1.3rem'}}>No answers yet.</div>
        :
        null
        }
      </div>
      :
      <div>
      <header className="App-header" style={{"backgroundColor":"#282c34","minHeight":"10vh","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center","fontSize":"calc(10px + 2vmin)","color":"white"}}>
        <h2>Welcome to Python Quiz</h2>
      </header>
      {last_updated && <div className="p-xs pb-0 text-center" style={{fontFamily: 'averta-bold', color: 'rgba(0, 0, 0, 0.40)', fontSize: '1.1rem'}}><img src='https://image.flaticon.com/icons/svg/131/131116.svg' width='20px' className='v-middle'/> <span className='pl-xxs v-middle'>{"Last updated: " + moment(last_updated).fromNow()} </span></div>}  
      {db_template && db_template.disabled_users.length && db_template.disabled_users.indexOf(props.user.id) >= 0 ?
        <div className="pt-xs text-center" style={{fontFamily: 'averta-bold', color: 'rgba(0, 0, 0, 0.15)', fontSize: '1.3rem'}}>You are currently disabled by the mentor</div>
        :
      <div style={{padding:15}}>
        {Questions.map((data, i)=>{
         return<div>
                  <h5>{i+1}. {data}</h5>
                    <textarea style={{padding:10}} placeholder='Answer' value={answers && answers[i]} onChange={(e)=>setAnswer(i, e.target.value)}/>
                  <br/> <br/>
                </div>
        })}

        <button  className='ui button p-s primary' style={{width:"100%"}} onClick={()=>submitData()}>Submit</button>
      </div>
      }
      </div>
      }
    </div>
  );
}

export default App;