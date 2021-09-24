async function addQuestion(event) {
    event.preventDefault();
    let answer=false;
    const question_text = document.querySelector('textarea[name="question-text"]').value;
    const user_id = document.querySelector('body').getAttribute('data-user_id');
    if (document.getElementById('yes').checked ) {answer=true;}

  
    const response = await fetch(`/api/questions`, {
      method: 'POST',
      body: JSON.stringify({
        question_text,
        answer,
        user_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }