// CalculateTime.js
 const calculateTimeDifference = (postCreatedAt) => {
    const currentDate = new Date();
    const postDate = new Date(postCreatedAt);
    const timeDifferenceInMinutes = Math.floor((currentDate - postDate) / (1000 * 60));
    
    // Format the post date
    const formattedDate = new Date(postCreatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
    // Format the time ago
    let timeAgo;
    if (timeDifferenceInMinutes < 60) {
      timeAgo = `${timeDifferenceInMinutes} min${timeDifferenceInMinutes === 1 ? '' : 's'} ago`;
    } else {
      const hours = Math.floor(timeDifferenceInMinutes / 60);
      timeAgo = `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }
  
    return `${formattedDate} (${timeAgo})`;
  };
  
  export default calculateTimeDifference;