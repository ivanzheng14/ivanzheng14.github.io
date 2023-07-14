function submitForm() {
    const term = document.getElementById('term').value;
    const crn = document.getElementById('crn').value;
    
    fetch('http://localhost:3000/check-seats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ term, crn }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  