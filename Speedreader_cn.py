from drawingpanel import *
import sys, string, jieba


def animate_text(panel, filename, width, height, font_size, wpm):
	canvas = panel.canvas
	canvas.config(width = width, height = height)
	print_words(get_words(filename), canvas, width, height, font_size, wpm,panel)



def get_words(filename):
	'''returns a list with all the words'''
	words = []
	with open(str(filename), "w") as f:
		lines = list(f)
		for line in lines:
			seg_list = jieba.cut(line, cut_all=False, HMM = True)
			for x in seg_list:
				words.append(x)
	return words




def print_words(words, canvas, width, height, font_size, wpm,panel):
	for word in words:
		focus_letter = ""
		letter_pos = 0
		length = len(word)
		font_size = int(font_size)
		#if length>= 0 and length <= 1:
		#	focus_letter = word[0]
		#	letter_pos = 0
		#elif length>= 2 and length <= 5:
		#	focus_letter = word[1]
		#	letter_pos = 1
		#	word = " " * (length - 3) + word[:letter_pos]+" "+word[letter_pos+1:]+" "*(3-length)
		'''elif length>= 6 and length <= 9:
			focus_letter = word[2]
			letter_pos = 2
			word = " " * (length - 5) + word[:letter_pos]+" "+word[letter_pos+1:]+" "*(6-length)
		elif length>= 10 and length <= 13:
			focus_letter = word[3]
			letter_pos = 3
			word = " " * (length - 7) + word[:letter_pos]+" "+word[letter_pos+1:]
		else:
			focus_letter = word[4]
			letter_pos = 4
			word = " " * (length - 9) + word[:letter_pos]+" "+word[letter_pos+1:]'''
		canvas.create_text(width/2 ,height/2, text = word, font=("宋体", font_size))
		#canvas.create_text(width/2 ,height/2, text = focus_letter, fill = "red", font=("Courier", font_size))
		if word[-1] == "." or word[-1] == "," or word[-1] == ";":
			panel.sleep(120000/wpm)
		else:
			panel.sleep(60000/wpm)
		canvas.delete("all")

def main():
	filename = sys.argv[1]
	width = sys.argv[2]
	height = sys.argv[3]
	font_size = sys.argv[4]
	wpm = sys.argv[5]
	panel = DrawingPanel()
	panel.set_background("white")
	animate_text(panel, filename, int(width), int(height), font_size, int(wpm))

main()
