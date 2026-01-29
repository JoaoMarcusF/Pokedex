import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';




const PokemonCard= React.memo((({name, id, image,types})=>{

  // const styles = {
  //     paperContainer: {
  //         height: 250,
  //         backgroundImage: `url(${bgImage})`,
          
  //     }
  // };


    const typehandler = () =>{
      if (types[1]){
        return types[0] + "/" + types[1]
      }
      return types[0]
    }
  
  return (
    <Card sx={{ width: 285, height: 355, marginBottom: 2}}>
      <Typography  align = 'center 'backgroundColor='rgb(180, 165, 165)' variant='h4' component='div'>
        {id}
      </Typography>
      <CardMedia
        sx={{ height: 250 ,backgroundColor:'rgb(180, 165, 165)'}}
        component="img"
        loading="lazy"
        image = {image}
        //style={styles.paperContainer}
      />
      <CardContent>
        <Box display = 'flex' justifyContent ='space-between' alignItems={'center'}>
          <Typography style={{ textTransform: 'capitalize' }} gutterBottom variant="h4" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            {typehandler()}
          </Typography>
        </Box>
        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */} 
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}));

export default PokemonCard;