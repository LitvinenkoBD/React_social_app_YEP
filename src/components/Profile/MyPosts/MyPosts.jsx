import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';


const MyPosts = (props) => {

    // создаем новый массив postsElement переберая старый с методом .map элементы обозвали post
    let postsElement = props.postsData.map(post => <Post message={post.message} likes={post.likesCount}/>)

    //Линкуем textarea чтобы потом к нему обращаться через current
    let newPostElement = React.createRef();

    //обращаемся к диспатчам
    let addPost = () => {
        props.addPostActionCreatorDumpFunc();
    }
    //обращаемся к диспатчам
    let addLetters = () => {
        let letters = newPostElement.current.value;
        props.addLettersActionCreatorDumpFunk(letters)
    }

    return (
            <div className={s.posts_block}>
                <h2>My posts</h2>
                <div>
                    <textarea ref={newPostElement} onChange={ addLetters } value={props.letterL}/>
                    <div className="">
                        <button onClick={ addPost }>Add post</button>
                    </div>
                    <div className="">
                        <button >Remove</button>
                    </div>

                </div>
                <div>
                    Old posts
                    { postsElement }
                </div>
            </div>        
    )
}

export default MyPosts;