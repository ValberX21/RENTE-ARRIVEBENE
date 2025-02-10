const postBody = async (url, data, httpType) => {
   
    try {
      const response = await fetch(url, {
        method: httpType,
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
   
    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: "Get",      
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
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