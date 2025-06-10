"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";

type TasteProfile = {
  flavorPreference: string;
  acidity: number;
  body: number;
  roastLevel: string;
  brewMethod: string[];
  drinkingTime: string[];
  caffeine: string;
};

export default function TasteProfilePage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [tasteProfile, setTasteProfile] = useState<TasteProfile>({
    flavorPreference: "",
    acidity: 50,
    body: 50,
    roastLevel: "",
    brewMethod: [],
    drinkingTime: [],
    caffeine: "",
  });

  const handleNextStep = () => {
    const nextStep = step + 1;
    setStep(nextStep);
    setProgress(nextStep * 25);
  };

  const handlePrevStep = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    setProgress(prevStep * 25);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Taste profile submitted:", tasteProfile);
    router.push("/catalog");
  };

  const handleRadioChange = (name: keyof TasteProfile, value: string) => {
    setTasteProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSliderChange = (name: keyof TasteProfile, value: number[]) => {
    setTasteProfile((prev) => ({
      ...prev,
      [name]: value[0],
    }));
  };

  const handleCheckboxChange = (
    name: keyof TasteProfile,
    value: string,
    checked: boolean
  ) => {
    setTasteProfile((prev) => {
      const currentValues = prev[name] as string[];
      return {
        ...prev,
        [name]: checked
          ? [...currentValues, value]
          : currentValues.filter((item) => item !== value),
      };
    });
  };

  return (
    <div className="container max-w-2xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">
          {t("tasteProfile.title", language)}
        </h1>
        <p className="text-muted-foreground">
          {t("tasteProfile.description", language)}
        </p>
      </div>

      <div className="mb-8">
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {t(`tasteProfile.steps.${step}.title`, language)}
          </CardTitle>
          <CardDescription>
            {t(`tasteProfile.steps.${step}.description`, language)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>
                    {t("tasteProfile.flavorPreferences.title", language)}
                  </Label>
                  <RadioGroup
                    value={tasteProfile.flavorPreference}
                    onValueChange={(value) =>
                      handleRadioChange("flavorPreference", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fruity" id="fruity" />
                      <Label htmlFor="fruity">
                        {t(
                          "tasteProfile.flavorPreferences.options.fruity",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nutty" id="nutty" />
                      <Label htmlFor="nutty">
                        {t(
                          "tasteProfile.flavorPreferences.options.nutty",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="caramel" id="caramel" />
                      <Label htmlFor="caramel">
                        {t(
                          "tasteProfile.flavorPreferences.options.caramel",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="floral" id="floral" />
                      <Label htmlFor="floral">
                        {t(
                          "tasteProfile.flavorPreferences.options.floral",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="earthy" id="earthy" />
                      <Label htmlFor="earthy">
                        {t(
                          "tasteProfile.flavorPreferences.options.earthy",
                          language
                        )}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>{t("tasteProfile.acidity.title", language)}</Label>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{t("tasteProfile.acidity.low", language)}</span>
                      <span>{t("tasteProfile.acidity.high", language)}</span>
                    </div>
                    <Slider
                      value={[tasteProfile.acidity]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) =>
                        handleSliderChange("acidity", value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>{t("tasteProfile.brewMethod.title", language)}</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="drip"
                        checked={tasteProfile.brewMethod.includes("drip")}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange("brewMethod", "drip", checked)
                        }
                      />
                      <Label htmlFor="drip">
                        {t("tasteProfile.brewMethod.options.drip", language)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="espresso"
                        checked={tasteProfile.brewMethod.includes("espresso")}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange(
                            "brewMethod",
                            "espresso",
                            checked
                          )
                        }
                      />
                      <Label htmlFor="espresso">
                        {t(
                          "tasteProfile.brewMethod.options.espresso",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="french-press"
                        checked={tasteProfile.brewMethod.includes(
                          "french-press"
                        )}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange(
                            "brewMethod",
                            "french-press",
                            checked
                          )
                        }
                      />
                      <Label htmlFor="french-press">
                        {t(
                          "tasteProfile.brewMethod.options.french-press",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="aeropress"
                        checked={tasteProfile.brewMethod.includes("aeropress")}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange(
                            "brewMethod",
                            "aeropress",
                            checked
                          )
                        }
                      />
                      <Label htmlFor="aeropress">
                        {t(
                          "tasteProfile.brewMethod.options.aeropress",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cold-brew"
                        checked={tasteProfile.brewMethod.includes("cold-brew")}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange(
                            "brewMethod",
                            "cold-brew",
                            checked
                          )
                        }
                      />
                      <Label htmlFor="cold-brew">
                        {t(
                          "tasteProfile.brewMethod.options.cold-brew",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="moka-pot"
                        checked={tasteProfile.brewMethod.includes("moka-pot")}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange(
                            "brewMethod",
                            "moka-pot",
                            checked
                          )
                        }
                      />
                      <Label htmlFor="moka-pot">
                        {t(
                          "tasteProfile.brewMethod.options.moka-pot",
                          language
                        )}
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>
                    {t("tasteProfile.drinkingTime.title", language)}
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="morning"
                        checked={tasteProfile.drinkingTime.includes("morning")}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange(
                            "drinkingTime",
                            "morning",
                            checked
                          )
                        }
                      />
                      <Label htmlFor="morning">
                        {t(
                          "tasteProfile.drinkingTime.options.morning",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="midday"
                        checked={tasteProfile.drinkingTime.includes("midday")}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange(
                            "drinkingTime",
                            "midday",
                            checked
                          )
                        }
                      />
                      <Label htmlFor="midday">
                        {t(
                          "tasteProfile.drinkingTime.options.midday",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="afternoon"
                        checked={tasteProfile.drinkingTime.includes(
                          "afternoon"
                        )}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange(
                            "drinkingTime",
                            "afternoon",
                            checked
                          )
                        }
                      />
                      <Label htmlFor="afternoon">
                        {t(
                          "tasteProfile.drinkingTime.options.afternoon",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="evening"
                        checked={tasteProfile.drinkingTime.includes("evening")}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange(
                            "drinkingTime",
                            "evening",
                            checked
                          )
                        }
                      />
                      <Label htmlFor="evening">
                        {t(
                          "tasteProfile.drinkingTime.options.evening",
                          language
                        )}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>{t("tasteProfile.roastLevel.title", language)}</Label>
                  <RadioGroup
                    value={tasteProfile.roastLevel}
                    onValueChange={(value) =>
                      handleRadioChange("roastLevel", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">
                        {t("tasteProfile.roastLevel.options.light", language)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">
                        {t("tasteProfile.roastLevel.options.medium", language)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium-dark" id="medium-dark" />
                      <Label htmlFor="medium-dark">
                        {t(
                          "tasteProfile.roastLevel.options.medium-dark",
                          language
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">
                        {t("tasteProfile.roastLevel.options.dark", language)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="no-preference"
                        id="no-preference"
                      />
                      <Label htmlFor="no-preference">
                        {t(
                          "tasteProfile.roastLevel.options.no-preference",
                          language
                        )}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>{t("tasteProfile.body.title", language)}</Label>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{t("tasteProfile.body.light", language)}</span>
                      <span>{t("tasteProfile.body.full", language)}</span>
                    </div>
                    <Slider
                      value={[tasteProfile.body]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) =>
                        handleSliderChange("body", value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>{t("tasteProfile.caffeine.title", language)}</Label>
                  <RadioGroup
                    value={tasteProfile.caffeine}
                    onValueChange={(value) =>
                      handleRadioChange("caffeine", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="regular" />
                      <Label htmlFor="regular">
                        {t("tasteProfile.caffeine.options.regular", language)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="decaf" id="decaf" />
                      <Label htmlFor="decaf">
                        {t("tasteProfile.caffeine.options.decaf", language)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">
                        {t("tasteProfile.caffeine.options.both", language)}
                      </Label>
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
              {t("tasteProfile.buttons.back", language)}
            </Button>
          ) : (
            <div></div>
          )}
          {step < 4 ? (
            <Button
              onClick={handleNextStep}
              className="bg-amber-800 hover:bg-amber-900"
            >
              {t("tasteProfile.buttons.continue", language)}
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-amber-800 hover:bg-amber-900"
            >
              {t("tasteProfile.buttons.complete", language)}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
