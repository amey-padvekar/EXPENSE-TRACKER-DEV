import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

function BudgetButton({handleBudget}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [textValue, setTextValue] = useState("");

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  }

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  }

  const handleSetButtonClick = () => {
    setIsExpanded(!isExpanded);
    handleBudget(textValue);
    
  }

  return (
    <>
      <Button on variant='outlined' onClick={handleButtonClick}>Set Budget</Button>
      {isExpanded &&
        <div>
          <TextField  type="text" value={textValue} variant="standard" onChange={handleTextChange} />
          <Button onClick={handleSetButtonClick}>Set</Button>
        </div>
      }
    </>
  );
}

export default BudgetButton;
