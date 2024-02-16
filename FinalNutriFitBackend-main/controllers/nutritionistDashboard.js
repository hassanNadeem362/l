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
        const { foodName, description, calories,  carbs,  fats,  protein, cholesterol, fiber, sodium} = req.body;
        const updateNutFood = await NutFood.findByIdAndUpdate(foodId, { foodName, description, calories,  carbs,  fats,  protein, cholesterol, fiber, sodium}, { new: true })
        if (!updateNutFood) {
            return res.status(404).send("Event not found");
        } else {
            res.status(200).json(updateNutFood);
        }
    } catch (error) {
        console.log(error)
    }

  };

  
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
    