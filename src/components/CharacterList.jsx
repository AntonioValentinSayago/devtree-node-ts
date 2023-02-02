import { useEffect, useState } from 'React'
import { Character } from '../components/Character'


export const CharacterList = () => {

    const [characters, setCharacteres] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://rickandmortyapi.com/api/character')
            const data = await response.json();
            setCharacteres(data.results);
        }

        fetchData();
    }, [])

    return (
        <div>
            {
                characters.map(character => {
                    return (
                        <Character key={character.id} character={character}/>
                    )
                })
            }
        </div>
    )
}

export default CharacterList
