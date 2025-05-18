"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

export default function TasteProfilePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [tasteProfile, setTasteProfile] = useState({
    flavorPreference: "",
    acidity: 50,
    body: 50,
    roastLevel: "",
    brewMethod: [],
    drinkingTime: [],
    caffeine: "",
  })

  const handleNextStep = () => {
    const nextStep = step + 1
    setStep(nextStep)
    setProgress(nextStep * 25)
  }

  const handlePrevStep = () => {
    const prevStep = step - 1
    setStep(prevStep)
    setProgress(prevStep * 25)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Taste profile submitted:", tasteProfile)
    router.push("/catalog")
  }

  const handleRadioChange = (name, value) => {
    setTasteProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSliderChange = (name, value) => {
    setTasteProfile((prev) => ({
      ...prev,
      [name]: value[0],
    }))
  }

  const handleCheckboxChange = (name, value, checked) => {
    setTasteProfile((prev) => {
      const currentValues = prev[name] || []
      return {
        ...prev,
        [name]: checked ? [...currentValues, value] : currentValues.filter((item) => item !== value),
      }
    })
  }

  return (
    <div className="container max-w-2xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Discover Your Coffee Profile</h1>
        <p className="text-muted-foreground">
          Help us understand your preferences so we can recommend the perfect coffee for you
        </p>
      </div>

      <div className="mb-8">
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Flavor Preferences"}
            {step === 2 && "Brewing & Drinking Habits"}
            {step === 3 && "Roast & Body Preferences"}
            {step === 4 && "Almost Done!"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us about the flavors you enjoy in coffee"}
            {step === 2 && "How do you brew and when do you drink your coffee?"}
            {step === 3 && "Let's talk about your preferred roast level and body"}
            {step === 4 && "Just a few more details to perfect your recommendations"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>What flavor notes do you prefer in your coffee?</Label>
                  <RadioGroup
                    value={tasteProfile.flavorPreference}
                    onValueChange={(value) => handleRadioChange("flavorPreference", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fruity" id="fruity" />
                      <Label htmlFor="fruity">Fruity & Bright (berries, citrus)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nutty" id="nutty" />
                      <Label htmlFor="nutty">Nutty & Chocolatey (hazelnut, cocoa)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="caramel" id="caramel" />
                      <Label htmlFor="caramel">Caramel & Sweet (toffee, brown sugar)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="floral" id="floral" />
                      <Label htmlFor="floral">Floral & Herbal (jasmine, bergamot)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="earthy" id="earthy" />
                      <Label htmlFor="earthy">Earthy & Spicy (tobacco, clove)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>How do you feel about acidity in coffee?</Label>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low acidity</span>
                      <span>High acidity</span>
                    </div>
                    <Slider
                      value={[tasteProfile.acidity]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleSliderChange("acidity", value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>How do you typically brew your coffee? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="drip"
                        checked={tasteProfile.brewMethod.includes("drip")}
                        onCheckedChange={(checked) => handleCheckboxChange("brewMethod", "drip", checked)}
                      />
                      <Label htmlFor="drip">Drip/Pour Over</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="espresso"
                        checked={tasteProfile.brewMethod.includes("espresso")}
                        onCheckedChange={(checked) => handleCheckboxChange("brewMethod", "espresso", checked)}
                      />
                      <Label htmlFor="espresso">Espresso</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="french-press"
                        checked={tasteProfile.brewMethod.includes("french-press")}
                        onCheckedChange={(checked) => handleCheckboxChange("brewMethod", "french-press", checked)}
                      />
                      <Label htmlFor="french-press">French Press</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="aeropress"
                        checked={tasteProfile.brewMethod.includes("aeropress")}
                        onCheckedChange={(checked) => handleCheckboxChange("brewMethod", "aeropress", checked)}
                      />
                      <Label htmlFor="aeropress">AeroPress</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cold-brew"
                        checked={tasteProfile.brewMethod.includes("cold-brew")}
                        onCheckedChange={(checked) => handleCheckboxChange("brewMethod", "cold-brew", checked)}
                      />
                      <Label htmlFor="cold-brew">Cold Brew</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="moka-pot"
                        checked={tasteProfile.brewMethod.includes("moka-pot")}
                        onCheckedChange={(checked) => handleCheckboxChange("brewMethod", "moka-pot", checked)}
                      />
                      <Label htmlFor="moka-pot">Moka Pot</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>When do you typically drink coffee? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="morning"
                        checked={tasteProfile.drinkingTime.includes("morning")}
                        onCheckedChange={(checked) => handleCheckboxChange("drinkingTime", "morning", checked)}
                      />
                      <Label htmlFor="morning">Morning (6am-10am)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="midday"
                        checked={tasteProfile.drinkingTime.includes("midday")}
                        onCheckedChange={(checked) => handleCheckboxChange("drinkingTime", "midday", checked)}
                      />
                      <Label htmlFor="midday">Midday (10am-2pm)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="afternoon"
                        checked={tasteProfile.drinkingTime.includes("afternoon")}
                        onCheckedChange={(checked) => handleCheckboxChange("drinkingTime", "afternoon", checked)}
                      />
                      <Label htmlFor="afternoon">Afternoon (2pm-6pm)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="evening"
                        checked={tasteProfile.drinkingTime.includes("evening")}
                        onCheckedChange={(checked) => handleCheckboxChange("drinkingTime", "evening", checked)}
                      />
                      <Label htmlFor="evening">Evening (after 6pm)</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>What roast level do you prefer?</Label>
                  <RadioGroup
                    value={tasteProfile.roastLevel}
                    onValueChange={(value) => handleRadioChange("roastLevel", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light (bright, tea-like, higher acidity)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium (balanced, caramel sweetness)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium-dark" id="medium-dark" />
                      <Label htmlFor="medium-dark">Medium-Dark (rich, chocolate notes)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Dark (bold, smoky, lower acidity)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no-preference" id="no-preference" />
                      <Label htmlFor="no-preference">No preference / Not sure</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>How do you like the body/mouthfeel of your coffee?</Label>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Light body</span>
                      <span>Full body</span>
                    </div>
                    <Slider
                      value={[tasteProfile.body]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleSliderChange("body", value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Do you prefer regular or decaffeinated coffee?</Label>
                  <RadioGroup
                    value={tasteProfile.caffeine}
                    onValueChange={(value) => handleRadioChange("caffeine", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="regular" />
                      <Label htmlFor="regular">Regular (with caffeine)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="decaf" id="decaf" />
                      <Label htmlFor="decaf">Decaffeinated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Both (depends on time of day)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handlePrevStep}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          {step < 4 ? (
            <Button onClick={handleNextStep} className="bg-amber-800 hover:bg-amber-900">
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-amber-800 hover:bg-amber-900">
              Complete Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
