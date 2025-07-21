import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShoppingCart, Users, Calendar, CheckCircle, User, LogOut, Package, Sparkles, ChefHat, UtensilsCrossed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnimatedBackground from "@/components/ui/animated-background";
import EnhancedIconButton from "@/components/ui/enhanced-icon-button";
import AdvancedExportMenu from "@/components/ui/advanced-export-menu";
import { ExportData } from "@/utils/advancedFileExport";

  const renderSignIn = () => (
    <AnimatedBackground variant="signin">
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 shadow-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-orange-600 flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-full">
              <ShoppingCart className="h-8 w-8" />
            </div>
            Meal Cart Planner Pro
          </CardTitle>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            Smart grocery planning made easy
          </p>
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
              <Label htmlFor="familySize" className="flex items-center gap-2 font-semibold">
                <Users className="h-4 w-4" />
                Family Members
              </Label>
              <Input id="familySize" name="familySize" type="number" min="1" max="20" placeholder="Number of family members" required />
            </div>
            <EnhancedIconButton 
              type="submit" 
              variant="warning" 
              size="lg" 
              className="w-full"
              icon={Sparkles}
              glowEffect
            >
              Sign In & Start Planning
            </EnhancedIconButton>
          </form>
        </CardContent>
      </Card>
      </div>
    </AnimatedBackground>
  );

  const renderWelcome = () => (
    <AnimatedBackground variant="welcome">
      <div className="min-h-screen flex items-center justify-center p-4 relative">
      <UserProfile />
        <Card className="w-full max-w-md text-center backdrop-blur-sm bg-white/90 shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-600 flex items-center justify-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <User className="h-8 w-8" />
            </div>
            Welcome {user?.username}!
          </CardTitle>
          <p className="text-gray-600 flex items-center justify-center gap-2 mt-2">
            <Users className="h-4 w-4" />
            Planning for {user?.familySize} family members
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg text-gray-700">
            Ready to plan your monthly groceries?
          </div>
          <div className="space-y-3">
            <EnhancedIconButton 
              onClick={() => setCurrentStep('meals')} 
              variant="success"
              size="lg"
              className="w-full"
              icon={Calendar}
              glowEffect
            >
              Yes, Let's Plan!
            </EnhancedIconButton>
            <EnhancedIconButton variant="outline" size="lg" className="w-full">
              Maybe Later
            </EnhancedIconButton>
          </div>
        </CardContent>
      </Card>
      </div>
    </AnimatedBackground>
  );

  const renderMealSelection = () => (
  <AnimatedBackground variant="meals">
    <div className="min-h-screen p-4 relative">
    <UserProfile />
    <div className="max-w-4xl mx-auto">
        <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-600 flex items-center justify-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <UtensilsCrossed className="h-8 w-8" />
            </div>
            Select Your Meals
          </CardTitle>
          <p className="text-gray-600">Choose which meals you'd like to plan for the month</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { type: 'breakfast', name: 'Breakfast', image: "/images/Breakfast/breakfast.jpg", icon: '🌅' },
              { type: 'lunch', name: 'Lunch', image: "/images/Lunch/lunch.webp", icon: '☀️' },
              { type: 'dinner', name: 'Dinner', image: "/images/Dinner/dinner.jpeg", icon: '🌙' }
            ].map(meal => (
              <Card 
                key={meal.type}
                className="cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl backdrop-blur-sm bg-white/95 border-2 border-transparent hover:border-green-300"
                onClick={() => {
                  setSelectedMealType(meal.type as 'breakfast' | 'lunch' | 'dinner');
                  setCurrentStep(meal.type as 'breakfast' | 'lunch' | 'dinner');
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg border-4 border-white">
                    <img 
                      src={meal.image} 
                      alt={`${meal.name} Icon`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute -top-2 -right-2 text-2xl bg-white rounded-full p-1 shadow-md">
                      {meal.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{meal.name}</h3>
                  <p className="text-gray-600 mt-2">Plan your {meal.name.toLowerCase()} options</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  </AnimatedBackground>
);

  const renderFoodSelection = (mealType: 'breakfast' | 'lunch' | 'dinner') => (
    <AnimatedBackground variant={mealType}>
      <div className="min-h-screen p-4 relative">
      <UserProfile />
      <div className="max-w-6xl mx-auto">
          <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-purple-600 capitalize flex items-center justify-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <ChefHat className="h-8 w-8" />
              </div>
              Select {mealType} Items
            </CardTitle>
            <p className="text-gray-600">Choose your favorite {mealType} options</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {mealOptions[mealType].map(item => (
                <Card 
                  key={item.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                    mealSelection[mealType].includes(item.id) 
                      ? 'ring-4 ring-purple-500 bg-purple-50/90 shadow-xl' 
                      : 'hover:shadow-lg bg-white/90'
                  }`}
                  onClick={() => toggleSelection(mealType, item.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-xl overflow-hidden shadow-lg border-2 border-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{item.name}</h4>
                    {mealSelection[mealType].includes(item.id) && (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-purple-500 bg-white rounded-full" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-between">
              <EnhancedIconButton 
                variant="outline" 
                onClick={() => setCurrentStep('meals')}
              >
                Back to Meals
              </EnhancedIconButton>
              <EnhancedIconButton 
                onClick={() => setCurrentStep('confirmation')}
                disabled={mealSelection[mealType].length === 0}
                variant="primary"
                icon={CheckCircle}
                glowEffect
              >
                Continue to Frequencies
              </EnhancedIconButton>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </AnimatedBackground>
  );

    
    return (
      <AnimatedBackground variant="confirmation">
        <div className="min-h-screen p-4 relative">
        <UserProfile />
        <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-indigo-600 flex items-center justify-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Calendar className="h-8 w-8" />
                </div>
                Confirm Your Meal Plan
              </CardTitle>
              <p className="text-gray-600">Set how many times you'll have each meal per month</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-8">
                {allSelectedItems.map(itemId => {
                  const item = Object.values(mealOptions).flat().find(i => i.id === itemId);
                  return (
                    <div key={itemId} className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-white/50">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center shadow-sm">
                          🍽️
                        </div>
                        <span className="font-semibold text-gray-800">{item?.name}</span>
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
                          className="w-20 rounded-lg border-2 border-indigo-200 focus:border-indigo-400"
                          onChange={(e) => updateFrequency(itemId, parseInt(e.target.value) || 1)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between">
                <EnhancedIconButton 
                  variant="outline" 
                  onClick={() => setCurrentStep('meals')}
                >
                  Back to Meal Selection
                </EnhancedIconButton>
                <EnhancedIconButton 
                  onClick={() => setCurrentStep('shopping')}
                  variant="primary"
                  icon={ShoppingCart}
                  glowEffect
                >
                  Generate Shopping List
                </EnhancedIconButton>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </AnimatedBackground>
    );
  };

  const renderShoppingList = () => {
    const shoppingList = generateShoppingList();
    const exportData: ExportData = {
      username: user?.username || 'User',
      familySize: user?.familySize || 1,
      generatedDate: new Date().toLocaleDateString(),
      items: Object.entries(shoppingList).map(([name, quantity]) => ({ 
        name, 
        quantity,
        category: getCategoryForItem(name),
        priority: getPriorityForItem(name)
      })),
      totalItems: Object.keys(shoppingList).length,
      mealPlan: {
        breakfast: mealSelection.breakfast.map(id => mealOptions.breakfast.find(item => item.id === id)?.name || id),
        lunch: mealSelection.lunch.map(id => mealOptions.lunch.find(item => item.id === id)?.name || id),
        dinner: mealSelection.dinner.map(id => mealOptions.dinner.find(item => item.id === id)?.name || id)
      }
    };
    
    return (
      <AnimatedBackground variant="shopping">
        <div className="min-h-screen p-4 relative">
        <UserProfile />
        <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-emerald-600 flex items-center justify-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                Your Monthly Shopping List
              </CardTitle>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                For {user?.familySize} family members • {Object.keys(shoppingList).length} items
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {Object.entries(shoppingList).map(([ingredient, quantity]) => (
                  <div key={ingredient} className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-white/50 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="font-semibold text-gray-800 flex-1">{ingredient}</span>
                    </div>
                    <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold text-sm">
                      ×{quantity}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center space-y-4">
                <AdvancedExportMenu 
                  data={exportData}
                  onSaveToDatabase={() => {
                    toast({
                      title: "Shopping list saved!",
                      description: "Your monthly grocery plan has been saved successfully.",
                    });
                  }}
                />
                <div className="mt-4">
                  <EnhancedIconButton 
                    variant="outline"
                    onClick={() => setCurrentStep('welcome')}
                    size="lg"
                  >
                    Start Over
                  </EnhancedIconButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </AnimatedBackground>
    );
  };

  // Helper functions for categorizing items
  const getCategoryForItem = (itemName: string): string => {
    const categories: { [key: string]: string } = {
      'Rice': 'Grains & Cereals',
      'Wheat': 'Grains & Cereals',
      'Dal': 'Pulses & Legumes',
      'Oil': 'Cooking Essentials',
      'Ghee': 'Cooking Essentials',
      'Spices': 'Spices & Seasonings',
      'Vegetables': 'Fresh Produce',
      'Fruits': 'Fresh Produce',
      'Milk': 'Dairy Products',
      'Eggs': 'Protein',
      'Chicken': 'Protein',
      'Mutton': 'Protein'
    };
    
    for (const [key, category] of Object.entries(categories)) {
      if (itemName.toLowerCase().includes(key.toLowerCase())) {
        return category;
      }
    }
    return 'General';
  };

  const getPriorityForItem = (itemName: string): 'high' | 'medium' | 'low' => {
    const highPriority = ['Rice', 'Dal', 'Oil', 'Salt', 'Sugar'];
    const lowPriority = ['Herbs', 'Garnish', 'Optional'];
    
    for (const item of highPriority) {
      if (itemName.toLowerCase().includes(item.toLowerCase())) {
        return 'high';
      }
    }
    
    for (const item of lowPriority) {
      if (itemName.toLowerCase().includes(item.toLowerCase())) {
        return 'low';
      }
    }
    
    return 'medium';
  };

  // Alternative save function for backward compatibility
  const handleSaveList = () => {
    const shoppingList = generateShoppingList();
    const exportData: ExportData = {
      username: user?.username || 'User',
      familySize: user?.familySize || 1,
      generatedDate: new Date().toLocaleDateString(),
      items: Object.entries(shoppingList).map(([name, quantity]) => ({ name, quantity })),
      totalItems: Object.keys(shoppingList).length
    };
    
    // Save as JSON by default
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `grocery-list-${exportData.username}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Shopping list saved!",
      description: "Your monthly grocery plan has been saved successfully.",
    });
  };

  // Legacy render for backward compatibility
  const renderShoppingListLegacy = () => {
    const shoppingList = generateShoppingList();
    
    return (
      <AnimatedBackground variant="shopping">
        <div className="min-h-screen p-4 relative">
        <UserProfile />
        <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-emerald-600 flex items-center justify-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                Your Monthly Shopping List
              </CardTitle>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                For {user?.familySize} family members • {Object.keys(shoppingList).length} items
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {Object.entries(shoppingList).map(([ingredient, quantity]) => (
                  <div key={ingredient} className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-white/50 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="font-semibold text-gray-800 flex-1">{ingredient}</span>
                    </div>
                    <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold text-sm">
                      ×{quantity}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center space-y-4">
                <EnhancedIconButton 
                  onClick={handleSaveList}
                  variant="success"
                  size="lg"
                  icon={Save}
                  glowEffect
                >
                  Save Shopping List
                </EnhancedIconButton>
                <EnhancedIconButton 
                  variant="outline"
                  onClick={() => {
                    setCurrentStep('welcome')
                  }}
                  size="lg"
                >
                  Start Over
                </EnhancedIconButton>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </AnimatedBackground>
    );
  };