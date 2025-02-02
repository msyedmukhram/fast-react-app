import React from 'react'
import { useNavigate } from 'react-router-dom';

const SearchOrder = () => {
    const [query,setQuery] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        if(!query.trim()){
            return;
        }
        navigate(`/order/${query}`);
        setQuery('');
    }

  return (
    <form onSubmit={handleSubmit}>
        <input placeholder='Search Order' 
           type="text"
           value={query}
           onChange={(e) => setQuery(e.target.value)}
           />
    </form>   
  )
}

export default SearchOrder