  const NutFood = require("../models/NutFood");
const Nutrafit = require("../models/nutraFit_User");
  const sendResponse = (res, statusCode, code, statusMessage, data = null) => {
    res
      .status(statusCode)
      .json({ status: code, statusMessage: statusMessage, data });
  };

  const handleSuccess = (res, status, message, data) => {
 
    sendResponse(res, status, 200, message, data);
  };

  const handleServerError = (res, error) => {
    console.error("Error:", error);
    sendResponse(res, 500, 500, "Internal server error");
  };
  const getNutritionistDashboard = async (req, res) => {
    
      try {
        const users = await Nutrafit.find({}, 'name email contact role'); // You can customize the fields you want to retrieve
        res.json({ data: users });
      } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
    const deleteNutritionist = async (req, res) => {
      const userId = req.params.id;
    
      try {
        // Find the user by ID and delete
        const deletedUser = await Nutrafit.findByIdAndDelete(userId);
    
        if (!deletedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    const getNutDashboard = async (req, res) => {
      try {
        const userId = req.params.userId; // Assuming userId is passed as a parameter
    
        // Find the user
        const user = await Nutrafit.findById(userId);
        if (!user) {
          return sendResponse(res, 404, "User not found");
        }
    
      
    
    
        // Send the response
        sendResponse( res,200, 200,"User dashboard retrieved successfully", user);
      } catch (error) {
        console.error("Error:", error);
        sendResponse(res, 500, "Internal server error");
      }
    };  
  
    const addFood = async (req, res) => {
      try {
        const {
          foodName,
          description,
          calories,
          carbs,
          fats,
          protein,
          cholesterol,
          fiber,
          sodium
        } = req.body;
    
        const image = req.file;
    
        if (!foodName || !description || !image || !calories || !carbs || !fats || !protein || !cholesterol || !fiber || !sodium) {
          return sendResponse(res, 400, "Bad Request", "Missing required fields");
        }
    
        // Assume that nutritionistId is passed in the request or retrieved from the session
        const nutritionistId = req.body.nutritionistId; // Change this line based on your authentication logic
    
        // Save the food information to the database with reference to the nutritionist
        const newFood = new NutFood({
          nutritionistId,
          foodName,
          description,
          calories,
          carbs,
          fats,
          protein,
          cholesterol,
          fiber,
          sodium,
          image: {
            data: image.buffer,
            contentType: image.mimetype,
          },
        });
    
        await newFood.save();
    
        handleSuccess(res, 201, "Food added successfully", newFood);
      } catch (error) {
        handleServerError(res, error);
      }
    };
    
    const deleteFood = async (req, res) => {
      try {
        const { foodId } = req.params;
        const nutritionistId = req.body.nutritionistId; // Change this line based on your authentication logic
        console.log("🚀 ~ deleteFood ~ nutritionistId:", nutritionistId)
    
        if (!foodId) {
          return sendResponse(res, 400, "Bad Request", "Food ID is required");
        }
    
        // Find and delete the food item by its ID and the associated nutritionist ID
        const deletedFood = await NutFood.findOneAndDelete({ _id: foodId, nutritionistId });
    
        if (!deletedFood) {
          return sendResponse(res, 404, "Not Found", "Food not found");
        }
    
        handleSuccess(res, 200, "Food deleted successfully", deletedFood);
      } catch (error) {
        handleServerError(res, error);
      }
    };

  const updateFood = async (req, res) => {
    try {
      const { foodId } = req.params;

      const food = await NutFood.findById(foodId);

      if (!food) {
        // Food not found
        return res.status(404).json({ success: false, message: 'Food not found' });
      }

      // Extract fields from the request body
      const {
        foodName,
        description,
        calories,
        carbs,
        fats,
        protein,
        cholesterol,
        fiber,
        sodium,
      } = req.body;

      // Update food information based on the fields present in the request body
      if (foodName) food.foodName = foodName;
      if (description) food.description = description;
      if (calories) food.calories = calories;
      if (carbs) food.carbs = carbs;
      if (fats) food.fats = fats;
      if (protein) food.protein = protein;
      if (cholesterol) food.cholesterol = cholesterol;
      if (fiber) food.fiber = fiber;
      if (sodium) food.sodium = sodium;

      await food.save();

      // Send a success response with the updated food data
      res.status(200).json({
        success: true,
        message: 'Food updated successfully',
        data: {
          _id: food._id,
          foodName: food.foodName,
          description: food.description,
          calories: food.calories,
          carbs: food.carbs,
          fats: food.fats,
          protein: food.protein,
          cholesterol: food.cholesterol,
          fiber: food.fiber,
          sodium: food.sodium,
        },
      });
    } catch (err) {
      // Handle server error
      console.error('Error updating food:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  //
    // const addedFoods = async (req, res) => {
    //   try {
    //     // Fetch the list of added foods from the database
    //     const foods = await NutFood.find({}); // Customize the fields you want to retrieve
    
    //     // Send the list of added foods as a response
    //     sendResponse(res, 200, 200, "List of added foods", foods);
    //   } catch (error) {
    //     handleServerError(res, error);
    //   }
    // };
    const addedFoods = async (req, res) => {
      try {
        // Fetch the list of added foods from the database
        const foods = await NutFood.find({}); // Customize the fields you want to retrieve
        console.log("🚀 ~ addedFoods ~ foods:", foods)

        sendResponse(res, 200, 200, "List of added foods", foods);
      } catch (error) {
        handleServerError(res, error);
      }
    };
    const addedFoodById = async (req, res) => {
      try {
        // Fetch the list of added foods from the database
        const foods = await NutFood.find({ nutritionistId: req.params.nutId });
        // Customize the fields you want to retrieve
     
        sendResponse(res, 200, 200, "List of added foods", foods);
      } catch (error) {
        handleServerError(res, error);
      }
    };
    
    module.exports = {
      addedFoods,addedFoodById,
      addFood,
      deleteNutritionist,
      getNutritionistDashboard,
      getNutDashboard,
      deleteFood,
      updateFood
    };
    