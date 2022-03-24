import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Divider, IconButton, Input, Modal, Paper, Stack, Typography } from "@mui/material"
import InfoCard from "../components/InfoCard"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useState } from "react";
import FoodCard from "../components/FoodCard";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Box, height } from "@mui/system";
import FoodCal from "../components/FoodCal";
import UserContex from "../store/user-contex";


function TodayView() {
	const [expanded, setExpanded] = useState(false);
	const [meal, setMeal] = useState('');
	const userData = useContext(UserContex);

  const handleClose = () => setMeal('');

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const addToMeal = (calories) => {
		console.log(`${calories} calories Meal added to ${meal}`)
	}

	return (<div className='today-view'>
		<Paper elevation={3} className='paper'>
			<h3>Today status</h3>

			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={{ xs: 1, sm: 2, md: 4 }}
				justifyContent="center"
				alignItems="flex-start"
			>
				<InfoCard
					header={{ title: "RDI", subheader: "Recomanded Daily Intake", avatar: "/favicon.png" }}
					value={`${userData.rdi} Calories`}
					description="The RDI (Recomanded Daily Intake) of calories calculated accourding to your body
					wegiht, hight, age and gender. It will be varry with your helth and other medical conditions.
					This value use to only for tracking purpose."
				/>

				<InfoCard
					header={{ title: "Current Intake", avatar: "/favicon.png" }}
					value="1000 Calories"
					description="The RDI (Recomanded Daily Intake) of calories calculated accourding to your body
					wegiht, hight, age and gender. It will be varry with your helth and other medical conditions.
					This value use to only for tracking purpose."
				/>

				<InfoCard
					header={{ title: "Day Summery", subheader: "Percentage of daily requrement", avatar: "/favicon.png" }}
					value="50%"
					description="Eat rest of 50% end of the day. You have to get lunch and dinner"
				/>
			</Stack>
		</Paper>

		<Paper elevation={3} className='paper'>
			<h3>Meal Records</h3>

			<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
						Breakfast
					</Typography>
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>750 Calories</Typography>
					<Divider orientation="vertical" flexItem variant="middle" textAlign="center" sx={{width: 10}} />
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>15%</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack
						direction="column"
						spacing={1}
						justifyContent="center"
						alignItems="center"
					>
						<FoodCard
							header={{ title: "Rice and Curry", avatar: "/favicon.png" }}
							value="2500 Calories"
						/>

						<FoodCard
							header={{ title: "Bunana", avatar: "/favicon.png" }}
							value="1000 Calories"
						/>

						<IconButton aria-label="delete" size="large" color="success" onClick={setMeal.bind(null, 'break-first')}>
							<FastfoodIcon />
						</IconButton>
					</Stack>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2bh-content"
					id="panel2bh-header"
				>
				<Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
						Lunch
					</Typography>
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>750 Calories</Typography>
					<Divider orientation="vertical" flexItem variant="middle" textAlign="center" sx={{width: 10}} />
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>25%</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
						varius pulvinar diam eros in elit. Pellentesque convallis laoreet
						laoreet.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3bh-content"
					id="panel3bh-header"
				>
					<Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
						Dinner
					</Typography>
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>750 Calories</Typography>
					<Divider orientation="vertical" flexItem variant="middle" textAlign="center" sx={{width: 10}} />
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>15%</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
						amet egestas eros, vitae egestas augue. Duis vel est augue.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel4bh-content"
					id="panel4bh-header"
				>
					<Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
						Snacks
					</Typography>
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>750 Calories</Typography>
					<Divider orientation="vertical" flexItem variant="middle" textAlign="center" sx={{width: 10}} />
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>15%</Typography>						</AccordionSummary>
				<AccordionDetails>

				</AccordionDetails>
			</Accordion>
		</Paper>

		<Modal
        open={!!meal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
				<div>
        	<FoodCal addToMeal={addToMeal} closeCard={handleClose}></FoodCal>
				</div>
		</Modal>
	</div>)
}

export default TodayView