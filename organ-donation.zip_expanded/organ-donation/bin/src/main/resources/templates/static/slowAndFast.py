import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from PIL import Image

# Define linked list structure
nodes = [(i, 0) for i in range(10)]  # 10 nodes in a straight line
cycle_start = 4  # Cycle starts from node 4
cycle_end = 9    # Last node points back to node 4

def create_edges():
    edges = [(nodes[i], nodes[i + 1]) for i in range(len(nodes) - 1)]
    if cycle_start is not None:
        edges.append((nodes[cycle_end], nodes[cycle_start]))  # Creating cycle
    return edges

def update(frame):
    global slow, fast
    ax.clear()
    ax.set_xlim(-1, len(nodes))
    ax.set_ylim(-1, 1)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.axis("off")
    
    # Draw nodes
    for x, y in nodes:
        ax.plot(x, y, "bo", markersize=10)
    
    # Draw edges
    for (x1, y1), (x2, y2) in create_edges():
        ax.arrow(x1, y1, x2 - x1 - 0.1, y2 - y1, head_width=0.05, head_length=0.1, fc='gray', ec='gray')
    
    # Draw slow pointer
    if slow < len(nodes):
        ax.arrow(nodes[slow][0], nodes[slow][1] + 0.2, 0, -0.1, head_width=0.05, head_length=0.05, fc='blue', ec='blue')
    
    # Draw fast pointer
    if fast < len(nodes):
        ax.arrow(nodes[fast][0], nodes[fast][1] + 0.4, 0, -0.1, head_width=0.05, head_length=0.05, fc='red', ec='red')
    
    # Move pointers
    if fast < len(nodes) - 1:
        fast += 2
    if slow < len(nodes) - 1:
        slow += 1
    
    # Detect cycle
    if fast >= len(nodes):
        fast = cycle_start  # Looping back to start of cycle
    if slow >= len(nodes):
        slow = cycle_start
    if slow == fast:
        ax.text(nodes[slow][0], nodes[slow][1] - 0.5, "Cycle Detected!", fontsize=12, color='red', fontweight='bold')
        ani.event_source.stop()

# Initialize plot
fig, ax = plt.subplots(figsize=(8, 3))
slow, fast = 0, 0
ani = animation.FuncAnimation(fig, update, frames=15, interval=500)

# Save as GIF
ani.save("slow_fast_cycle.gif", writer="pillow", fps=2)

plt.show()