export default {
    filters: {
        parseDate: (ms) => {
          var d = new Date(ms);
          var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
          return d.toLocaleDateString("en-US", options);
        }
    }
}