import React, { useState,useEffect } from 'react'
import './home.css';

function Home() {
    const [show, setShow] = useState(0)
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch('http://127.0.0.1:5000/get_user_data', { credentials: 'include' })
          .then(response => response.json())
          .then(data => {
            setUser(data);
            if (Object.keys(data).length === 0) {
              window.location.href = '/';
            }
          })
          .catch(error => console.error(error));
      }, []);
    const [post, setPost] = useState([])
    const [mypost,setMypost]=useState([])

    const [search, setSearch] = useState('')
    const [already, setAlready] = useState([])

    const updateUserUrl = `http://127.0.0.1:5000/update/${user.email}`;

    const [data, setData] = useState([]);
    useEffect(() => {
      fetch('http://127.0.0.1:5000/all')
        .then(response => response.json())
        .then(data => setData(data.data))
        .catch(error => {
            console.log(error)});
    }, [user]);
    const [follow, setFollow] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/follow')
          .then(response => response.json())
          .then(follow => 
            {//console.log(follow)
            setFollow(follow.data)})
          .catch(error => {
              console.log(error)});
      }, [user]);

      useEffect(() => {
        fetch("http://localhost:5000/posts")
        .then((res) => res.json())
        .then((data) => {
        const filteredPosts = data.data.filter(
            (post) =>
            post.a === user.email ||
            follow.filter((item) => item.a === user.email)
                .map((item) => item.b)
                .includes(post.a)
        );
        setPost(filteredPosts);
        })
        .then(console.log(post))
        .catch((err) => console.log(err));
    }, [follow]);

    useEffect(() => {
        fetch("http://localhost:5000/posts")
          .then((res) => res.json())
          .then((data) => {
            const filteredPosts = data.data.filter((post) => post.a === user.email);
            setMypost(filteredPosts);
          })
          .catch((err) => console.log(err));
      }, [user]);
      const [imageTag, setImageTag] = useState('');

    useEffect(() => {
        async function getImageTag() {
        const response = await fetch('http://localhost:5000/profileimage');
        const imgTag = await response.text();
        setImageTag(imgTag);
        }
        getImageTag();
    }, [user]);
    function handelFollow(b){
        fetch('http://localhost:5000/newfollow/'+b)
        .then(() => {
            fetch('http://127.0.0.1:5000/already')
              .then(response => response.json())
              .then(data => setAlready(data))
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
    }
    const [now, setNow] = useState('')
    async function loadimg(id) {
        const response= fetch(`http://localhost:5000/image/${id}`);
        const n= await response.text();
        setNow(n)
        return n
      }
      useEffect(() => {
        fetch('http://127.0.0.1:5000/already')
        .then(response => response.json())
        .then(data => setAlready(data))
        .catch(error => {
            console.log(error)});
    }, [follow]);
    useEffect(() => {
        console.log(already);
      }, [already]);
        function make() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = async (event) => {
              const file = event.target.files[0];
              const formData = new FormData();
              formData.append('image', file);
              const response = await fetch('http://localhost:5000/make', {
                method: 'POST',
                body: formData,
              });
              if (response.ok) {
                // handle successful response
                alert('new post made')
              } else {
                // handle error response
              }
            };
            input.click();
            
          }

      
  return (
    <>
        <>
            <article class="header">
                <nav>
                    <ul>
                        <li><i class="fa fa-home"></i><strong>SoulConnect</strong></li>
                    </ul>
                    <ul>
                        <li><button onClick={()=>{make()}}>New post</button></li>
                        <li><a onClick={()=>{setShow(0)}}>Feed</a></li>
                        <li><a onClick={()=>{setShow(1)}}>Explore</a></li>
                        <li><a onClick={()=>{setShow(2)}}>Profile</a></li>
                        <li><a onClick={()=>{setShow(3)}}>Settings</a></li>
                    </ul>
                </nav>
            </article>
        </>
        {show===0 && <>
            {post.map(item => (
            <article>
                <div><h3>{item.a}</h3></div>
                <div className='grid'>
                    <div>
                    <div className='profilepic' dangerouslySetInnerHTML={{ __html: item.img }} />
                    </div>
                    <div>
                        <h4>{item.caption}</h4>
                    </div>
                </div>
                <div className='grid next'>
                    <button>like</button>
                    <button>comment</button>
                </div>
            </article>))}
        
        </>}
        {show===1 && <>
            <article>
                <input type='text' value={search} onChange={e=>setSearch(e.target.value)} placeholder='search user'></input>
            </article>
            { search!='' &&<>
            {data.filter((item) => item.name.includes(search)).map(item => (
                <article>
                    <div className='grid'>
                        <h4>{item.name}</h4>
                        <h4>{item.email}</h4>
                        <button className='close' onClick={()=>{handelFollow(item.email)}}>{already.some(obj => obj.b === item.email) ? 'Unfollow' : 'Follow'}</button>
                    </div>
            </article>))}
            
            </>}
        </>}
        {show===2 && <>
            <article>
                <h2>{user.name}</h2>
                <hr></hr>
                <div className='grid'>
                    <div>
                        <div className='profilepic' dangerouslySetInnerHTML={{ __html: imageTag }} />
                    </div>
                    <div>
                        <div className='grid'>
                            <div><h5>phone: {user.phone}</h5></div>
                            <div><h5>email: {user.email}</h5></div>
                        </div>
                        <div className='grid'>
                            <div><h5>dob: {user.dob}</h5></div>
                            <div><h5>occupation: {user.occupation}</h5></div>
                        </div>
                        <div className='grid'>
                            <div><h5>bio: {user.bio}</h5></div>
                        </div>
                    </div>
                </div>
            </article>
            <article>
                <div className='grid'>
                    <div><h5>posts : {post.filter(item => item.a === user.email).length}</h5></div>
                    <div><h5>followers : {follow.filter(item => item.b === user.email).length}</h5></div>
                    <div><h5>following : {follow.filter(item => item.a === user.email).length}</h5></div>
                </div>
            </article>
            <article>
                <h2>Posts:</h2>
                <hr></hr>
                <div className='grid'>{mypost.map(item=><article class='flow'><div className='profilepic' dangerouslySetInnerHTML={{ __html: item.img }} /></article>)}</div>
            </article>
        
        </>}
        {show===3 && <>
            <article className='form'>
                <form action={updateUserUrl} method='POST' encType='multipart/form-data'>
                    <h4 align='center'>Update Profile</h4>
                    <div className='grid'>
                        <input type='text' name='name' placeholder='name'/>
                    </div>
                    <div className='grid'>
                        <input type='date' name='dob' placeholder='dob'/>
                        <input type='text'name='occupation'  placeholder='occupation'/>
                    </div>
                    <div className='grid'>
                        <input type='number' name='phone' placeholder='phone no.'/>
                        <input type='file' name='img' accept='Image/*' placeholder='Profile Photo' defaultValue={''}/>
                    </div>
                    <textarea rows='5' name='bio' placeholder='Bio'/>
                    <button type='submit'>Update</button>
                </form>
            </article>
            <article className='form'>
                <a className='secondary logout' role='button' href='http://127.0.0.1:5000/logout'>Logout</a>
            </article>
        </>}

    </>
  )
}

export default Home