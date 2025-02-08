const postBody = async (url, data) => {
   
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const getList = async (url) => {
   
    try {
      const response = await fetch(url, {
        method: "Get",      
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };


export {postBody, getList};