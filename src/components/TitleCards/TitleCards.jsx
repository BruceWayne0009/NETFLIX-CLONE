import React, { useRef, useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/cards_data'
import { Link } from 'react-router-dom'

  const TitleCards = ({title, category}) => {
  
    const [apiData, setApidata] = useState([]);
    const cardsRef = useRef()

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWE3MzUzYzliZTI1NjZjNzg1MjkzOWFjMmIxN2YyYSIsIm5iZiI6MTczNjQ4MjcyNi41NzEsInN1YiI6IjY3ODA5ZmE2NDRkNjQ5ZmZhZTdiNjRjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zYUGsIMQMnKA7sXEw1Zu8utpyEtbxVMm1oh0BC8to1E'
      }
    };
    
    
    const handleWheel = (event)=>{
    event.preventDefault() 
    cardsRef.current.scrollLeft += event.deltaY;
    }
  
    useEffect(() => {

      fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApidata(response.results))
      .catch(err => console.error(err));

      cardsRef.current.addEventListener('wheel', handleWheel)
    }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards