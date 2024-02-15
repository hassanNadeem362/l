import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Cardd = ({ title, description, imageUrl }) => {
  const cardStyle = {
    width: '300px',  
    height: '400px',  
  };

  return (
    <div>
      <Card className='m-10' style={cardStyle}>
        <CardActionArea>
          <CardMedia
            component="img"
            src={imageUrl}
            alt={title}
            width='100%'
            height='60%'
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default Cardd;

