import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShoppingCart, Users, Calendar, CheckCircle, User, LogOut, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  username: string;
  familySize: number;
}

interface MealSelection {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  frequencies: { [key: string]: number };
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'signin' | 'welcome' | 'meals' | 'breakfast' | 'lunch' | 'dinner' | 'confirmation' | 'shopping'>('signin');
  const [user, setUser] = useState<User | null>(null);
  const [mealSelection, setMealSelection] = useState<MealSelection>({
    breakfast: [],
    lunch: [],
    dinner: [],
    frequencies: {}
  });
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const { toast } = useToast();

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const familySize = parseInt(formData.get('familySize') as string);

    if (username && password && familySize) {
      setUser({ username, familySize });
      setCurrentStep('welcome');
      toast({
        title: "Welcome!",
        description: `Hello ${username}! Let's plan your groceries.`,
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentStep('signin');
    setMealSelection({ breakfast: [], lunch: [], dinner: [], frequencies: {} });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const mealOptions = {
    breakfast: [
      { id: 'idli', name: 'Idli', image: "/images/Breakfast/idly.avif" },
      { id: 'dosa', name: 'Dosa', image:  "/images/Breakfast/dosa.webp" },
      { id: 'bread', name: 'Bread & Butter', image: "/images/Breakfast/bread.jpg" },
      { id: 'omelet', name: 'Omelet', image: "/images/Breakfast/omlet.webp" },
      { id: 'upma', name: 'Upma', image: "/images/Breakfast/mpaa.jpg" },
      { id: 'poha', name: 'Poha', image: "/images/Breakfast/poha.jpg" }
    ],

    lunch: [
      { id: 'rice-dal', name: 'Rice & Dal', image: "/images/Lunch/rice_dal.jpg" },
      { id: 'chapati', name: 'Chapati & Curry', image:  "/images/Lunch/chapathi.jpg" },
      { id: 'biryani', name: 'Biryani', image: "/images/Lunch/biryani.jpg" },
      { id: 'pulao', name: 'Pulao', image: "/images/Lunch/pulav.jpg" },
      { id: 'sambar', name: 'Sambar Rice', image: "/images/Lunch/sambhar.jpg" },
      { id: 'curd-rice', name: 'Curd Rice', image: "/images/Lunch/curd_rice.jpg" }
    ],
    dinner: [
      { id: 'curry-rice', name: 'Curry & Rice', image:"/images/Dinner/curry_rice.jpg" },
      { id: 'roti-sabzi', name: 'Roti & Sabzi', image:"/images/Dinner/roti_curry.jpg"},
      { id: 'dal-chawal', name: 'Dal Chawal', image: "/images/Dinner/dalchaval.jpg" },
      { id: 'fried-rice', name: 'Fried Rice', image: "/images/Dinner/friedrice.jpg"},
      { id: 'soup', name: 'Soup & Bread', image: "/images/Dinner/soup_bread.webp" },
      { id: 'pasta', name: 'Pasta', image: "/images/Dinner/pasta.jpg" }
    ]
  };

  const ingredients = {
    'idli': ['Rice (2kg)', 'Urad Dal (500g)', 'Fenugreek seeds (50g)', 'Salt (100g)'],
    'dosa': ['Rice (2kg)', 'Urad Dal (500g)', 'Chana Dal (200g)', 'Oil (500ml)'],
    'bread': ['Bread (4 loaves)', 'Butter (500g)', 'Jam (2 jars)'],
    'omelet': ['Eggs (2 dozen)', 'Onions (1kg)', 'Tomatoes (500g)', 'Oil (500ml)'],
    'upma': ['Semolina (1kg)', 'Vegetables (2kg)', 'Mustard seeds (100g)', 'Curry leaves (50g)'],
    'poha': ['Flattened Rice (1kg)', 'Peanuts (500g)', 'Onions (1kg)', 'Green chilies (200g)'],
    'rice-dal': ['Rice (5kg)', 'Toor Dal (2kg)', 'Turmeric (100g)', 'Ghee (500ml)'],
    'chapati': ['Wheat Flour (5kg)', 'Vegetables (3kg)', 'Spices (mixed)', 'Oil (1L)'],
    'biryani': ['Basmati Rice (2kg)', 'Chicken/Mutton (2kg)', 'Biryani Masala (200g)', 'Ghee (500ml)'],
    'pulao': ['Rice (3kg)', 'Vegetables (2kg)', 'Whole spices', 'Ghee (500ml)'],
    'sambar': ['Toor Dal (2kg)', 'Sambar powder (500g)', 'Vegetables (3kg)', 'Tamarind (500g)'],
    'curd-rice': ['Rice (2kg)', 'Curd (2L)', 'Mustard seeds (100g)', 'Curry leaves (50g)'],
    'curry-rice': ['Rice (3kg)', 'Mixed vegetables (3kg)', 'Curry powder (500g)', 'Coconut (5 pieces)'],
    'roti-sabzi': ['Wheat Flour (3kg)', 'Seasonal vegetables (4kg)', 'Spices (mixed)', 'Oil (1L)'],
    'dal-chawal': ['Rice (3kg)', 'Mixed Dal (2kg)', 'Turmeric (100g)', 'Ghee (500ml)'],
    'fried-rice': ['Rice (2kg)', 'Vegetables (2kg)', 'Soy sauce (2 bottles)', 'Oil (500ml)'],
    'soup': ['Mixed vegetables (2kg)', 'Bread (2 loaves)', 'Herbs (mixed)', 'Cream (500ml)'],
    'pasta': ['Pasta (2kg)', 'Tomatoes (2kg)', 'Cheese (500g)', 'Herbs (mixed)']
  };

  const toggleSelection = (mealType: 'breakfast' | 'lunch' | 'dinner', itemId: string) => {
    setMealSelection(prev => ({
      ...prev,
      [mealType]: prev[mealType].includes(itemId)
        ? prev[mealType].filter(id => id !== itemId)
        : [...prev[mealType], itemId]
    }));
  };

  const updateFrequency = (itemId: string, frequency: number) => {
    setMealSelection(prev => ({
      ...prev,
      frequencies: { ...prev.frequencies, [itemId]: frequency }
    }));
  };

  const generateShoppingList = () => {
    const shoppingList: { [key: string]: number } = {};
    
    [...mealSelection.breakfast, ...mealSelection.lunch, ...mealSelection.dinner].forEach(item => {
      const frequency = mealSelection.frequencies[item] || 1;
      const itemIngredients = ingredients[item as keyof typeof ingredients] || [];
      
      itemIngredients.forEach(ingredient => {
        const multiplier = frequency * (user?.familySize || 1);
        if (shoppingList[ingredient]) {
          shoppingList[ingredient] += multiplier;
        } else {
          shoppingList[ingredient] = multiplier;
        }
      });
    });

    return shoppingList;
  };

  const UserProfile = () => (
    <div className="absolute top-4 right-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-3 border hover:bg-gray-50">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-800">{user?.username}</div>
              <div className="text-gray-500 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {user?.familySize} members
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Account Details</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <div>
              <div className="font-medium">{user?.username}</div>
              <div className="text-sm text-gray-500">Username</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <div>
              <div className="font-medium">{user?.familySize} members</div>
              <div className="text-sm text-gray-500">Family size</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <div>
              <div className="font-medium">Previous Orders</div>
              <div className="text-sm text-gray-500">No orders yet</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 focus:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const renderSignIn = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Meal Cart Planner Pro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="Enter your username" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" required />
            </div>
            <div>
              <Label htmlFor="familySize" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Family Members
              </Label>
              <Input id="familySize" name="familySize" type="number" min="1" max="20" placeholder="Number of family members" required />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              Sign In & Start Planning
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  const renderWelcome = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4 relative">
      <UserProfile />
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-600">
            Welcome {user?.username}!
          </CardTitle>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Users className="h-4 w-4" />
            Planning for {user?.familySize} family members
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg text-gray-700">
            Ready to plan your monthly groceries?
          </div>
          <div className="space-y-3">
            <Button 
              onClick={() => setCurrentStep('meals')} 
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              size="lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Yes, Let's Plan!
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Maybe Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMealSelection = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 relative">
    <UserProfile />
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">Select Your Meals</CardTitle>
          <p className="text-gray-600">Choose which meals you'd like to plan for the month</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { type: 'breakfast', name: 'Breakfast', image: "/images/Breakfast/breakfast.jpg" },
              { type: 'lunch', name: 'Lunch', image: "/images/Lunch/lunch.webp" },
              { type: 'dinner', name: 'Dinner', image: "/images/Dinner/dinner.jpeg" }
            ].map(meal => (
              <Card 
                key={meal.type}
                className="cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg"
                onClick={() => {
                  setSelectedMealType(meal.type as 'breakfast' | 'lunch' | 'dinner');
                  setCurrentStep(meal.type as 'breakfast' | 'lunch' | 'dinner');
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden shadow border border-gray-200">
                    <img 
                      src={meal.image} 
                      alt={`${meal.name} Icon`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{meal.name}</h3>
                  <p className="text-gray-600 mt-2">Plan your {meal.name.toLowerCase()} options</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);


  const renderFoodSelection = (mealType: 'breakfast' | 'lunch' | 'dinner') => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 relative">
      <UserProfile />
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-purple-600 capitalize">
              Select {mealType} Items
            </CardTitle>
            <p className="text-gray-600">Choose your favorite {mealType} options</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {mealOptions[mealType].map(item => (
                <Card 
                  key={item.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    mealSelection[mealType].includes(item.id) 
                      ? 'ring-4 ring-purple-500 bg-purple-50' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => toggleSelection(mealType, item.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-lg overflow-hidden shadow">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    {mealSelection[mealType].includes(item.id) && (
                      <CheckCircle className="w-6 h-6 text-purple-500 mx-auto mt-2" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('meals')}
              >
                Back to Meals
              </Button>
              <Button 
                onClick={() => setCurrentStep('confirmation')}
                disabled={mealSelection[mealType].length === 0}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                Continue to Frequencies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderConfirmation = () => {
    const allSelectedItems = [...mealSelection.breakfast, ...mealSelection.lunch, ...mealSelection.dinner];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 p-4 relative">
        <UserProfile />
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-indigo-600">
                Confirm Your Meal Plan
              </CardTitle>
              <p className="text-gray-600">Set how many times you'll have each meal per month</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-8">
                {allSelectedItems.map(itemId => {
                  const item = Object.values(mealOptions).flat().find(i => i.id === itemId);
                  return (
                    <div key={itemId} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                          🍽️
                        </div>
                        <span className="font-medium text-gray-800">{item?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`freq-${itemId}`} className="text-sm text-gray-600">
                          Times/Month:
                        </Label>
                        <Input
                          id={`freq-${itemId}`}
                          type="number"
                          min="1"
                          max="30"
                          defaultValue="4"
                          className="w-20"
                          onChange={(e) => updateFrequency(itemId, parseInt(e.target.value) || 1)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep('meals')}
                >
                  Back to Meal Selection
                </Button>
                <Button 
                  onClick={() => setCurrentStep('shopping')}
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                >
                  Generate Shopping List
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderShoppingList = () => {
    const shoppingList = generateShoppingList();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 relative">
        <UserProfile />
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-emerald-600 flex items-center justify-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                Your Monthly Shopping List
              </CardTitle>
              <p className="text-gray-600">For {user?.familySize} family members</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {Object.entries(shoppingList).map(([ingredient, quantity]) => (
                  <div key={ingredient} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-800">{ingredient}</span>
                      <span className="text-emerald-600 font-semibold">×{quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center space-y-4">
                <Button 
                  onClick={() => {
                    toast({
                      title: "Shopping list saved!",
                      description: "Your monthly grocery plan has been saved successfully.",
                    });
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                  size="lg"
                >
                  Save Shopping List
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep('welcome')}
                  size="lg"
                >
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Render based on current step
  switch (currentStep) {
    case 'signin': return renderSignIn();
    case 'welcome': return renderWelcome();
    case 'meals': return renderMealSelection();
    case 'breakfast': return renderFoodSelection('breakfast');
    case 'lunch': return renderFoodSelection('lunch');
    case 'dinner': return renderFoodSelection('dinner');
    case 'confirmation': return renderConfirmation();
    case 'shopping': return renderShoppingList();
    default: return renderSignIn();
  }
};


export default Index;
