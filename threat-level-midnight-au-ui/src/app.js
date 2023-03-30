export class App {
  message = 'Hello World!';
  prompt;
  result;

  doStuff(){
    
    const url = 'http://localhost:3000';
    const method = 'POST';
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const bodyData = JSON.stringify({
      prompt: this.prompt
    });

    fetch(url, {
      method: method,
      headers: headers,
      body: bodyData
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        return response.json();
      })
      .then((data) => {
        this.result = data;
        console.log(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
}
