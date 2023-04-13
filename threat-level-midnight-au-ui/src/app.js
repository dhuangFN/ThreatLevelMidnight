export class App {
  prompt;
  history= [];

  attached(){
    const history = window.localStorage.getItem("history");
    this.history = history ? JSON.parse(history) : [];
  }

  storeHistory(){
    window.localStorage.setItem('history', JSON.stringify(this.history));
  }

  clearHistory(){
    this.history = [];
    window.localStorage.clear();
  }

  isImminentThreat(item){
    return item && item.result["threat-rating"] == 10;
  }

  showGreen(item){
    return item && item.result["threat-rating"] <= 3;
  }

  showYellow(item){
    return item && item.result["threat-rating"] >= 4 && item.result["threat-rating"] <= 7;
  }

  showRed(item){
    return item && item.result["threat-rating"] >= 8 && item.result["threat-rating"] <= 10;
  }

  assessThreat(){
    
    const url = 'http://localhost:3000';
    const method = 'POST';
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const bodyData = JSON.stringify({
      prompt: this.prompt
    });
    this.isLoading = fetch(url, {
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
        this.history.unshift({
          content: this.prompt,
          result: data
        });
        this.storeHistory();
        this.isLoading = null;
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
}
