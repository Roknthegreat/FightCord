"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import FightAnalysis from "@/components/FightAnalysis"

const formSchema = z.object({
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.enum(["Male", "Female"]),
  athletic: z.enum(["Yes", "No"]),
  fightExperience: z.enum(["None", "One", "2 to 4", "5+ Fights"]),
  personality: z.enum(["Laid back/Chill", "Pacifist/Non-confrontational", "Aggressive/Outspoken"]),
  fightingDisciplines: z.array(z.enum(["Boxing", "Wrestling", "MMA"])).optional(),
})

export default function FightForm() {
  const [activeTab, setActiveTab] = useState("user")
  const [userInfo, setUserInfo] = useState<z.infer<typeof formSchema> | null>(null)
  const [opponentInfo, setOpponentInfo] = useState<z.infer<typeof formSchema> | null>(null)

  const userForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: "",
      weight: "",
      age: "",
      gender: undefined,
      athletic: undefined,
      fightExperience: undefined,
      personality: undefined,
      fightingDisciplines: [],
    },
  })

  const opponentForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: "",
      weight: "",
      age: "",
      gender: undefined,
      athletic: undefined,
      fightExperience: undefined,
      personality: undefined,
      fightingDisciplines: [],
    },
  })

  function onSubmitUser(values: z.infer<typeof formSchema>) {
    setUserInfo(values)
    setActiveTab("opponent")
  }

  function onSubmitOpponent(values: z.infer<typeof formSchema>) {
    setOpponentInfo(values)
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-2xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="user" className="text-lg font-semibold">Your Information</TabsTrigger>
        <TabsTrigger value="opponent" disabled={!userInfo} className="text-lg font-semibold">Opponent Information</TabsTrigger>
      </TabsList>
      <TabsContent value="user" className="glass p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-primary">Enter Your Details</h2>
        {renderForm(userForm, onSubmitUser, "user")}
      </TabsContent>
      <TabsContent value="opponent" className="glass p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-primary">Enter Opponent&apos;s Details</h2>
        {renderForm(opponentForm, onSubmitOpponent, "opponent")}
      </TabsContent>
      {userInfo && opponentInfo && (
        <FightAnalysis userInfo={userInfo} opponentInfo={opponentInfo} />
      )}
    </Tabs>
  )
}

function renderForm(form: any, onSubmit: (values: z.infer<typeof formSchema>) => void, formType: "user" | "opponent") {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (feet & inches)</FormLabel>
              <FormControl>
                <Input placeholder="5&apos;10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (lbs)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" min="5" max="99" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          name="athletic"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are you athletic?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          name="fightExperience"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many fights have you been in?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="One">One</SelectItem>
                  <SelectItem value="2 to 4">2 to 4</SelectItem>
                  <SelectItem value="5+ Fights">5+ Fights</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          name="personality"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your overall personality type?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select personality type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Laid back/Chill">Laid back/Chill</SelectItem>
                  <SelectItem value="Pacifist/Non-confrontational">Pacifist/Non-confrontational</SelectItem>
                  <SelectItem value="Aggressive/Outspoken">Aggressive/Outspoken</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fightingDisciplines"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Fighting Disciplines</FormLabel>
                <FormDescription>
                  Select the fighting disciplines you know
                </FormDescription>
              </div>
              {["Boxing", "Wrestling", "MMA"].map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name="fightingDisciplines"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), item])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white">
          {formType === "user" ? "Next" : "Submit and Analyze"}
        </Button>
      </form>
    </Form>
  )
}
