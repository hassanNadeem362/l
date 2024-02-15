import React from 'react';

const ResultsScreen = () => {
    return (
        <div>
             <Container>
       <Row className="justify-content-center">
         <Col md={6}>
           <Card className="mt-5">
             <Card.Body>
               <Card.Title className="text-center">Your results</Card.Title>
               {results ? (
                 // If results are available, display them in a table
                 <table striped bordered hover>
                   <thead>
                     <tr>
                       <th>Category</th>
                       <th>Value</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                      <td>Body Mass Index (BMI)</td>
                       <td>{results.bmi}</td>
                     </tr>
                     <tr>
                       <td>Calorie Intake</td>
                       <td>{results.calorieIntake} kcal/day</td>
                     </tr>
                     <tr>
                       <td>Workout Plan</td>
                       <td>{results.workoutPlan}</td>
                     </tr>
                   </tbody>
                 </table>
               ) : (
                 // If results are not available, display a loading message
                 <p>Loading...</p>
               )}
             </Card.Body>
           </Card>
         </Col>
       </Row>
     </Container>
        </div>
    );
}

export default ResultsScreen;
